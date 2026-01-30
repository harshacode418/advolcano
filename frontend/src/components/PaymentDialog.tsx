import { useEffect, useMemo, useState } from "react";
import {
  Shield,
  AlertCircle,
  RefreshCcw,
  Loader2,
  ArrowRight,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { postJson } from "@/lib/api";

interface CreatePaymentResponse {
  order_id: string;
  razorpay_key: string;
  amount_inr: number;
}

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const MIN_USD_AMOUNT = 100;
const PLATFORM_FEE_PERCENT = 0.03;
const GST_PERCENT = 0.18;
const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/$/, "") ||
  "/api";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentDialog = ({ open, onOpenChange }: PaymentDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amountUsd: "",
  });
  const [rate, setRate] = useState<number | null>(null);
  const [rateUpdatedAt, setRateUpdatedAt] = useState<string | null>(null);
  const [loadingRate, setLoadingRate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usdAmount = useMemo(() => Number(formData.amountUsd) || 0, [formData]);
  const inrAmount = rate ? usdAmount * rate : 0;
  const platformFee = inrAmount * PLATFORM_FEE_PERCENT;
  const platformFeeUsd = usdAmount * PLATFORM_FEE_PERCENT;
  const gst = platformFee * GST_PERCENT;
  const gstUsd = platformFeeUsd * GST_PERCENT;
  const totalInr = inrAmount + platformFee + gst;
  const minAmountError =
    formData.amountUsd && usdAmount < MIN_USD_AMOUNT
      ? `Minimum top-up is $${MIN_USD_AMOUNT}`
      : "";

  const loadRazorpayScript = () =>
    new Promise<void>((resolve, reject) => {
      if (window.Razorpay) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Razorpay SDK"));
      document.body.appendChild(script);
    });

  const fetchConversionRate = async () => {
    try {
      setLoadingRate(true);
      const response = await fetch(`${API_BASE}/usd-to-inr/`);
      if (!response.ok) {
        throw new Error("Unable to fetch conversion rate");
      }
      const data = await response.json();
      setRate(data.rate);
      setRateUpdatedAt(data.timestamp ?? new Date().toISOString());
    } catch (error) {
      toast({
        title: "Exchange rate unavailable",
        description: "Please try refreshing the rate in a few seconds.",
        variant: "destructive",
      });
    } finally {
      setLoadingRate(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchConversionRate();
    }
  }, [open]);

  const handleInputChange = (field: "name" | "email" | "amountUsd") => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!rate) {
      toast({
        title: "Conversion rate missing",
        description: "Refresh the USD to INR rate before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (usdAmount < MIN_USD_AMOUNT) {
      toast({
        title: "Amount too low",
        description: `Minimum payment is $${MIN_USD_AMOUNT}.`,
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      amount_usd: Number(usdAmount.toFixed(2)),
      amount_inr: Number(inrAmount.toFixed(2)),
      commission: Number(platformFee.toFixed(2)),
      gst: Number(gst.toFixed(2)),
      total_amount: Number(totalInr.toFixed(2)),
    };

    try {
      const orderResponse = await postJson<CreatePaymentResponse, typeof payload>(
        "/create-payment/",
        payload
      );

      await loadRazorpayScript();

      const options = {
        key: orderResponse.razorpay_key,
        amount: Math.round(payload.total_amount * 100),
        currency: "INR",
        name: "AdVolcano.io",
        description: "Campaign wallet top-up",
        order_id: orderResponse.order_id,
        prefill: {
          name: payload.name,
          email: payload.email,
        },
        notes: {
          usd_amount: payload.amount_usd.toString(),
          platform_fee: payload.commission.toString(),
          gst: payload.gst.toString(),
        },
        handler: async (response: Record<string, string>) => {
          try {
            await postJson("/payment/verify/", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });
            toast({
              title: "Payment successful",
              description: "Your payment has been confirmed. Check your wallet soon.",
            });
            onOpenChange(false);
          } catch {
            toast({
              title: "Verification pending",
              description:
                "We received the payment but could not verify automatically. Support will assist you shortly.",
            });
          } finally {
            setIsSubmitting(false);
          }
        },
        modal: {
          ondismiss: () => {
            setIsSubmitting(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      setIsSubmitting(false);
      toast({
        title: "Unable to start payment",
        description:
          error instanceof Error ? error.message : "Please try again in a moment.",
        variant: "destructive",
      });
    }
  };

  const formatUsd = (value: number) =>
    `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  const formatInr = (value: number) =>
    `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[640px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            Credit/Debit Card Payment
          </DialogTitle>
          <DialogDescription>
            Top up your AdVolcano wallet via Razorpay with live USD → INR conversion.
          </DialogDescription>
        </DialogHeader>

        <div className="glass-card bg-primary/5 border border-primary/10 p-4 rounded-xl flex gap-3 items-start">
          <AlertCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
          <p className="text-sm text-primary-foreground/90">
            <span className="font-semibold">Important notice:</span> Use the same email
            and account name you registered with on AdVolcano.io. Payments reflect within
            24–48 hours after successful processing.
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                placeholder="Your AdVolcano account name"
                value={formData.name}
                onChange={handleInputChange("name")}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="Your AdVolcano account email"
                value={formData.email}
                onChange={handleInputChange("email")}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (USD) *</Label>
            <Input
              id="amount"
              type="number"
              min={MIN_USD_AMOUNT}
              step="1"
              placeholder={`Min ${MIN_USD_AMOUNT} USD`}
              value={formData.amountUsd}
              onChange={handleInputChange("amountUsd")}
              required
            />
            {minAmountError && (
              <p className="text-xs text-destructive">{minAmountError}</p>
            )}
            <div className="flex items-center justify-between text-sm text-muted-foreground bg-muted/40 px-3 py-2 rounded-lg">
              <span>
                USD to INR:{" "}
                {rate ? (
                  <span className="font-semibold">{formatInr(rate)}</span>
                ) : (
                  "fetching…"
                )}
              </span>
              <button
                type="button"
                className="inline-flex items-center gap-1 text-primary"
                onClick={fetchConversionRate}
                disabled={loadingRate}
              >
                {loadingRate ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin" /> Updating
                  </>
                ) : (
                  <>
                    <RefreshCcw className="w-3 h-3" /> Refresh
                  </>
                )}
              </button>
            </div>
            {rateUpdatedAt && (
              <p className="text-xs text-muted-foreground">
                Last updated: {new Date(rateUpdatedAt).toLocaleString()}
              </p>
            )}
          </div>

          <div className="glass-card rounded-2xl p-4 space-y-3 border border-border/60">
            <h4 className="text-sm font-semibold text-muted-foreground">
              Payment Summary
            </h4>
            <div className="flex justify-between text-sm">
              <span>Amount:</span>
              <span className="font-medium">
                {formatUsd(usdAmount)} / {formatInr(inrAmount)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-orange-500">
              <span>Platform Fee (3%)</span>
              <span className="font-medium">
                {formatUsd(platformFeeUsd)} / {formatInr(platformFee)}
              </span>
            </div>
            <div className="flex justify-between text-sm text-orange-500">
              <span>GST (18%)</span>
              <span className="font-medium">
                {formatUsd(gstUsd)} / {formatInr(gst)}
              </span>
            </div>
            <div className="border-t border-dashed border-border pt-3 flex justify-between text-base font-bold">
              <span>Total:</span>
              <span className="text-primary">{formatInr(totalInr)}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-xs text-muted-foreground">
            <Shield className="w-4 h-4 text-primary mt-0.5" />
            <p>
              By proceeding, you agree to our terms. Secure & non-refundable. Razorpay
              checkout opens in INR with all applicable fees included.
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="gradient-volcanic text-primary-foreground hover:opacity-90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Connecting to Razorpay
                </>
              ) : (
                <>
                  Proceed to Payment
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
