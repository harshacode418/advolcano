import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { postJson, ApiError } from "@/lib/api";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  first_name: z.string().min(1, "First name is required").max(50),
  last_name: z.string().min(1, "Last name is required").max(50),
  email: z.string().email("Enter a valid email").max(254),
  company: z.string().max(120).optional(),
  subject: z.string().min(3, "Please add a short subject").max(200),
  phone: z.string().max(20).optional(),
  message: z.string().min(10, "Tell us a little more about your needs").max(2000),
});

type ContactFormValues = z.infer<typeof formSchema>;

const defaultValues: ContactFormValues = {
  first_name: "",
  last_name: "",
  email: "",
  company: "",
  subject: "",
  phone: "",
  message: "",
};

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      await postJson<{ message: string }>("/contact/", values);
      toast({
        title: "Message received",
        description: "Our team will get back to you within 24 hours.",
      });
      form.reset(defaultValues);
    } catch (error) {
      const description =
        error instanceof ApiError
          ? error.message
          : "Something went wrong. Please try again.";
      toast({
        title: "Unable to submit",
        description,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="glass-card p-8 md:p-12 rounded-3xl">
            <div className="max-w-2xl">
              <p className="text-sm uppercase tracking-[0.3em] text-primary font-semibold mb-4">
                CONTACT US
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Tell us about your{" "}
                <span className="gradient-text">user acquisition goals</span>
              </h2>
              <p className="text-muted-foreground mb-10">
                Whether you are setting up your first campaign or migrating from
                another network, the AdVolcano revenue team is here to help.
              </p>
            </div>

            <Form {...form}>
              <form className="space-y-5" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="first_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First name</FormLabel>
                        <FormControl>
                          <Input placeholder="Jane" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="last_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="you@company.com"
                            {...field}
                          />
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
                          <Input placeholder="AdVolcano Inc." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="Partnership opportunity" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="+91 90000 00000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How can we help?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Share campaign goals, monthly budgets, or special requirements..."
                          className="min-h-[140px] resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  size="lg"
                  className="w-full gradient-volcanic text-primary-foreground hover:opacity-90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send message
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-3xl space-y-6">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-primary font-semibold mb-4">
                RESPONSE TIME
              </p>
              <h3 className="text-2xl font-semibold mb-2">Under 24 hours</h3>
              <p className="text-muted-foreground">
                We route every inbound request directly to sales engineering so
                you receive strategic guidance, not canned answers.
              </p>
            </div>

            <div className="grid gap-6">
              <div>
                <p className="text-sm font-semibold text-primary/80 mb-1">
                  Sales & Partnerships
                </p>
                <a
                  href="mailto:sales@advolcano.io"
                  className="text-lg font-medium hover:underline"
                >
                  sales@advolcano.io
                </a>
              </div>

              <div>
                <p className="text-sm font-semibold text-primary/80 mb-1">
                  Billing & Finance
                </p>
                <a
                  href="mailto:finance@zimzel.net"
                  className="text-lg font-medium hover:underline"
                >
                  finance@zimzel.net
                </a>
              </div>

              <div>
                <p className="text-sm font-semibold text-primary/80 mb-1">
                  Support
                </p>
                <a
                  href="mailto:support@advolcano.io"
                  className="text-lg font-medium hover:underline"
                >
                  support@advolcano.io
                </a>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground">
                Need priority access? Schedule a live onboarding session and
                we&apos;ll configure your tracking, pixel setup, and payouts
                during the call.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
