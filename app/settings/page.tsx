import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { User, Shield, Bell, Zap, CreditCard, Trash2 } from "lucide-react";
import Link from "next/link";

const sections = [
  { icon: User, label: "Account Details", href: "#account" },
  { icon: Shield, label: "Login & Security", href: "#security" },
  { icon: Bell, label: "Notifications", href: "#notifications" },
  { icon: Zap, label: "AI Preferences", href: "#ai" },
  { icon: CreditCard, label: "Subscription & Billing", href: "/settings/billing" },
  { icon: Shield, label: "Privacy & Data", href: "/settings/privacy" },
];

export default function Settings() {
  return (
    <AppLayout currentPath="/settings">
      <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">Settings</h1>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar nav */}
          <div className="space-y-1">
            {sections.map(({ icon: Icon, label, href }) => (
              <Link key={label} href={href} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                <Icon className="w-4 h-4" />{label}
              </Link>
            ))}
          </div>

          {/* Content */}
          <div className="md:col-span-3 space-y-6">
            {/* Account */}
            <Card id="account">
              <CardHeader><CardTitle>Account Details</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue="Alex Johnson" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="alex@example.com" />
                  </div>
                </div>
                <Button>Save Account</Button>
              </CardContent>
            </Card>

            {/* Security */}
            <Card id="security">
              <CardHeader><CardTitle>Login & Security</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <Input type="password" />
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" />
                </div>
                <Button>Update Password</Button>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card id="notifications">
              <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                {[
                  "Application reminders",
                  "Follow-up reminders",
                  "Resume generation completion",
                  "Product updates",
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <Label className="font-normal">{item}</Label>
                    <Switch />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Subscription */}
            <Card id="billing">
              <CardHeader>
                <CardTitle>Subscription & Billing</CardTitle>
                <CardDescription>Manage your plan and payment information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted rounded-xl">
                  <div>
                    <p className="font-semibold">Free Plan</p>
                    <p className="text-sm text-muted-foreground">3 job matches remaining this month</p>
                  </div>
                  <Link href="/pricing">
                    <Button>Upgrade to Candidate</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="border-destructive/40">
              <CardHeader>
                <CardTitle className="text-destructive">Danger Zone</CardTitle>
                <CardDescription>Permanently delete your account and all associated data.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive">
                  <Trash2 className="w-4 h-4 mr-2" />Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
