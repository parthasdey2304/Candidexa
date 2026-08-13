import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CreditCard, CheckCircle2, Calendar, Zap } from "lucide-react";
import Link from "next/link";

const billingHistory = [
  { date: "Aug 1, 2026", amount: "₹29.00", status: "Paid", invoice: "#INV-004" },
  { date: "Jul 1, 2026", amount: "₹29.00", status: "Paid", invoice: "#INV-003" },
  { date: "Jun 1, 2026", amount: "₹29.00", status: "Paid", invoice: "#INV-002" },
];

export default function BillingSettings() {
  return (
    <AppLayout currentPath="/settings">
      <div className="p-6 md:p-8 max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Subscription & Billing</h1>
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 p-3 rounded-lg">
          ⚠ Payment status is always verified server-side. Client-side data is for display only.
        </p>

        {/* Current Plan */}
        <Card>
          <CardHeader><CardTitle>Current Plan</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-indigo-50 border border-indigo-200 rounded-xl">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-indigo-900">Candidate Plan</p>
                  <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100">
                    <CheckCircle2 className="w-3 h-3 mr-1" />Active
                  </Badge>
                </div>
                <p className="text-sm text-indigo-700 mt-1">₹29/month · Renews Sep 1, 2026</p>
              </div>
              <Button variant="outline" className="text-destructive border-destructive/30 hover:bg-destructive/5">
                Cancel Plan
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-muted rounded-xl">
                <p className="text-lg font-bold">18/30</p>
                <p className="text-xs text-muted-foreground mt-1">Job Matches Used</p>
              </div>
              <div className="p-3 bg-muted rounded-xl">
                <p className="text-lg font-bold">5</p>
                <p className="text-xs text-muted-foreground mt-1">Tailored Resumes</p>
              </div>
              <div className="p-3 bg-muted rounded-xl">
                <p className="text-lg font-bold">Aug 1</p>
                <p className="text-xs text-muted-foreground mt-1">Renewal Date</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader><CardTitle>Payment Method</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Visa ending in 4242</p>
                  <p className="text-xs text-muted-foreground">Expires 12/2028</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">Update</Button>
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader><CardTitle>Billing History</CardTitle></CardHeader>
          <CardContent className="divide-y">
            {billingHistory.map(({ date, amount, status, invoice }) => (
              <div key={invoice} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-sm font-medium">{invoice}</p>
                  <p className="text-xs text-muted-foreground">{date}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">{amount}</span>
                  <Badge className="bg-green-100 text-green-700 border-green-200 hover:bg-green-100 text-xs">{status}</Badge>
                  <Button variant="ghost" size="sm" className="text-xs">Download</Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
