import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { User, Shield, Bell, Zap, CreditCard, Trash2, Palette } from "lucide-react";
import Link from "next/link";
import { AppearanceSettings } from "@/components/AppearanceSettings";

const sections = [
  { icon: User, label: "Account Details", href: "#account" },
  { icon: Shield, label: "Login & Security", href: "#security" },
  { icon: Palette, label: "Appearance", href: "#appearance" },
  { icon: Bell, label: "Notifications", href: "#notifications" },
  { icon: Zap, label: "AI Preferences", href: "#ai" },
  { icon: CreditCard, label: "Subscription & Billing", href: "/settings/billing" },
  { icon: Shield, label: "Privacy & Data", href: "/settings/privacy" },
];

export default function Settings() {
  return (
    <AppLayout currentPath="/settings">
      <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 bg-[#060e20] min-h-screen text-[#dae2fd]">
        <h1 className="text-3xl font-bold text-white tracking-tight">Settings</h1>

        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar nav */}
          <div className="space-y-1.5">
            {sections.map(({ icon: Icon, label, href }) => (
              <Link key={label} href={href} className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#908fa0] hover:bg-[#131b2e] hover:text-white transition-colors">
                <Icon className="w-4 h-4" />{label}
              </Link>
            ))}
          </div>

          {/* Content */}
          <div className="md:col-span-3 space-y-8">
            {/* Account */}
            <Card id="account" className="bg-[#131b2e] border-[#2d3449] shadow-none">
              <CardHeader>
                <CardTitle className="text-white text-xl">Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-3">
                    <Label className="text-[#908fa0] uppercase tracking-wider text-xs font-semibold">Full Name</Label>
                    <Input defaultValue="Alex Johnson" className="bg-[#0b1326] border-[#2d3449] text-white focus-visible:ring-[#6366f1] h-11" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[#908fa0] uppercase tracking-wider text-xs font-semibold">Email</Label>
                    <Input defaultValue="alex@example.com" className="bg-[#0b1326] border-[#2d3449] text-white focus-visible:ring-[#6366f1] h-11" />
                  </div>
                </div>
                <Button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]">Save Account</Button>
              </CardContent>
            </Card>

            {/* Security */}
            <Card id="security" className="bg-[#131b2e] border-[#2d3449] shadow-none">
              <CardHeader>
                <CardTitle className="text-white text-xl">Login & Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="space-y-3">
                  <Label className="text-[#908fa0] uppercase tracking-wider text-xs font-semibold">Current Password</Label>
                  <Input type="password" className="bg-[#0b1326] border-[#2d3449] text-white focus-visible:ring-[#6366f1] h-11" />
                </div>
                <div className="space-y-3">
                  <Label className="text-[#908fa0] uppercase tracking-wider text-xs font-semibold">New Password</Label>
                  <Input type="password" className="bg-[#0b1326] border-[#2d3449] text-white focus-visible:ring-[#6366f1] h-11" />
                </div>
                <Button className="bg-[#171f33] border border-[#2d3449] text-white hover:bg-[#222a3d] hover:text-[#dae2fd]">Update Password</Button>
              </CardContent>
            </Card>

            {/* Appearance */}
            <AppearanceSettings />

            {/* Notifications */}
            <Card id="notifications" className="bg-[#131b2e] border-[#2d3449] shadow-none">
              <CardHeader>
                <CardTitle className="text-white text-xl">Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  "Application reminders",
                  "Follow-up reminders",
                  "Resume generation completion",
                  "Product updates",
                ].map((item) => (
                  <div key={item} className="flex items-center justify-between">
                    <Label className="font-medium text-[15px] text-white">{item}</Label>
                    <Switch className="data-[state=checked]:bg-[#6366f1]" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Subscription */}
            <Card id="billing" className="bg-[#131b2e] border-[#2d3449] shadow-none">
              <CardHeader>
                <CardTitle className="text-white text-xl">Subscription & Billing</CardTitle>
                <CardDescription className="text-[#908fa0]">Manage your plan and payment information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between p-5 bg-[#0b1326] border border-[#2d3449] rounded-xl">
                  <div>
                    <p className="font-bold text-white text-lg">Free Plan</p>
                    <p className="text-sm text-[#908fa0] mt-1">3 job matches remaining this month</p>
                  </div>
                  <Link href="/pricing">
                    <Button className="bg-[#6366f1] hover:bg-[#4f46e5] text-white shadow-[0_0_15px_rgba(99,102,241,0.3)]">Upgrade to Candidate</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="bg-[#131b2e] border-[#93000a]/30 shadow-none">
              <CardHeader>
                <CardTitle className="text-[#ffb4ab] text-xl">Danger Zone</CardTitle>
                <CardDescription className="text-[#908fa0]">Permanently delete your account and all associated data.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="destructive" className="bg-[#93000a] text-[#ffb4ab] hover:bg-[#ba1a1a] hover:text-white border-none">
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
