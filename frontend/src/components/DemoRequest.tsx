import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Sparkles } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ApiError, postJson } from "@/lib/api";

const formSchema = z.object({
  interest: z.string().min(1, "Choose a focus area"),
  full_name: z.string().min(3, "Full name is required").max(120),
  email: z.string().email("Enter a valid email"),
  company: z.string().max(160).optional(),
  message: z.string().max(1000).optional(),
});

type DemoFormValues = z.infer<typeof formSchema>;

const interestOptions = [
  "Demand-side platform access",
  "Monetization / publishers",
  "Self serve ads manager",
  "Custom managed campaigns",
  "Partnerships",
];

const DemoRequest = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<DemoFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      interest: "",
      full_name: "",
      email: "",
      company: "",
      message: "",
    },
  });

  const onSubmit = async (values: DemoFormValues) => {
    try {
      setIsSubmitting(true);
      await postJson<{ message: string }>("/request-demo/", values);
      toast({
        title: "Demo booked",
        description: "Expect a calendar invite from our GTM team shortly.",
      });
      form.reset();
    } catch (error) {
      const description =
        error instanceof ApiError
          ? error.message
          : "We couldn’t schedule your demo. Please try again.";
      toast({
        title: "Unable to schedule",
        description,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="demo" className="py-24 relative">
      <div className="absolute inset-x-0 -top-20 mx-auto w-[90%] h-64 bg-primary/10 blur-[120px]" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="glass-card rounded-3xl p-8 md:p-14 overflow-hidden">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                LIVE PRODUCT DEMO
              </p>
              <h2 className="text-4xl font-bold mb-5 leading-tight">
                See AdVolcano&apos;s{" "}
                <span className="gradient-text">real-time bidding</span> stack in
                action.
              </h2>
              <p className="text-muted-foreground text-lg mb-8">
                30-minute personalized walkthrough led by performance engineers.
                We&apos;ll map your use case, discuss current spend, and share a
                roadmap for wallet credits, pixel setup, and optimizations.
              </p>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2" />
                  Immediate eligibility review for managed accounts above $5k
                  monthly spend.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2" />
                  Guided payment top-up and automated invoice flows.
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 rounded-full bg-primary mt-2" />
                  Access to exclusive publisher inventory for pre-launch
                  campaigns.
                </li>
              </ul>
            </div>

            <div className="glass-card p-8 rounded-2xl border border-primary/10 bg-background/60">
              <Form {...form}>
                <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name="interest"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What are you interested in?</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a focus area" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {interestOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Work email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@company.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company</FormLabel>
                        <FormControl>
                          <Input placeholder="AdVolcano Media" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional context (optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Share target geos, volumes, tracking stack, or budgets..."
                            className="min-h-[120px] resize-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full gradient-volcanic text-primary-foreground hover:opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Scheduling...
                      </>
                    ) : (
                      "Book live demo"
                    )}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoRequest;

