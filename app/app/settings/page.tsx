"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Bell,
  Check,
  Copy,
  CreditCard,
  Download,
  KeyRound,
  Loader2,
  LogOut,
  Monitor,
  Palette,
  Shield,
  Smartphone,
  User,
  X,
  Zap,
} from "lucide-react";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { PlanBadge } from "@/components/shared/usage-gauge";
import { useAuth } from "@/components/providers/AuthProvider";

function GithubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

const sessions = [
  { device: "Chrome on Windows", ip: "103.94.xxx.xx1", lastActive: "2 min ago", current: true },
  { device: "Safari on iPhone", ip: "103.94.xxx.xx2", lastActive: "3 hours ago", current: false },
  { device: "Firefox on MacBook", ip: "103.94.xxx.xx3", lastActive: "2 days ago", current: false },
];

const payments = [
  { date: "2026-07-20", amount: "₹399", plan: "Pro Monthly", status: "paid" },
  { date: "2026-06-20", amount: "₹399", plan: "Pro Monthly", status: "paid" },
];

const comparisonRows: Array<[string, string, string]> = [
  ["AI Resume Generator", "1/mo", "Unlimited"],
  ["JD Analyzer", "3/mo", "Unlimited"],
  ["Resume Tailoring", "—", "500 cos/batch"],
  ["Video Demos", "—", "20/mo"],
  ["Portfolio Hosting", "—", "Included"],
  ["AI Tokens", "10K/day", "500K/day"],
];

const accentOptions = [
  { name: "Indigo", value: "#6366f1" },
  { name: "Violet", value: "#8b5cf6" },
  { name: "Emerald", value: "#10b981" },
  { name: "Amber", value: "#f59e0b" },
];

interface ApiKey {
  id: string;
  name: string;
  prefix: string;
  createdAt: string;
  lastUsed: string;
  status: "active" | "revoked";
}

const mockApiKeys: ApiKey[] = [
  {
    id: "key-1",
    name: "Production",
    prefix: "candidexa_live_9f2c81",
    createdAt: "2026-07-01",
    lastUsed: "2 days ago",
    status: "active",
  },
  {
    id: "key-2",
    name: "Staging",
    prefix: "candidexa_test_3b17ad",
    createdAt: "2026-05-12",
    lastUsed: "3 weeks ago",
    status: "active",
  },
  {
    id: "key-3",
    name: "Legacy CLI",
    prefix: "candidexa_test_77e902",
    createdAt: "2026-02-20",
    lastUsed: "Never",
    status: "revoked",
  },
];

function generateKey() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const random = (len: number) =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `candidexa_live_${random(8)}_${random(16)}`;
}

function SettingsContent() {
  const searchParams = useSearchParams();
  const { user, plan, logout } = useAuth();
  const isPro = plan?.tier === "pro";

  const validTabs = new Set([
    "profile",
    "security",
    "billing",
    "usage",
    "github",
    "notifications",
    "apikeys",
    "appearance",
  ]);
  const tabParam = searchParams.get("tab");
  const activeTab = tabParam && validTabs.has(tabParam) ? tabParam : "profile";

  const [saveMsg, setSaveMsg] = useState("");
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [securityNotif, setSecurityNotif] = useState(true);
  const [show2faModal, setShow2faModal] = useState(false);
  const [qrShown, setQrShown] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [upgrading, setUpgrading] = useState(false);
  const [upgradeNote, setUpgradeNote] = useState("");
  const [githubConnected, setGithubConnected] = useState(false);
  const [accent, setAccent] = useState(accentOptions[0]);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [compactDensity, setCompactDensity] = useState(false);
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys);
  const [showCreateKey, setShowCreateKey] = useState(false);
  const [newKeyName, setNewKeyName] = useState("");
  const [generatedKey, setGeneratedKey] = useState("");
  const [copiedKey, setCopiedKey] = useState("");
  const [revokeKeyId, setRevokeKeyId] = useState<string | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  const handleTabChange = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("tab", value);
    window.history.replaceState(null, "", url.toString());
  };

  const handleSaveProfile = () => {
    setSaveMsg("Profile updated successfully");
    window.setTimeout(() => setSaveMsg(""), 3000);
  };

  const handleUpdatePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordMsg("Please fill in all password fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg("New password and confirmation do not match.");
      return;
    }
    setPasswordMsg("Password updated successfully.");
    window.setTimeout(() => setPasswordMsg(""), 3000);
  };

  const enable2fa = () => {
    setShow2faModal(false);
    setTwoFactorEnabled(true);
    setQrShown(false);
  };

  const handleUpgrade = async () => {
    setUpgrading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setUpgrading(false);
    setUpgradeNote("Redirected to Razorpay — in this demo the plan stays as-is.");
    window.setTimeout(() => setUpgradeNote(""), 4000);
  };

  const handleSignOut = async () => {
    setSigningOut(true);
    await logout();
  };

  const confirmLogoutAll = () => {
    setShowLogoutModal(false);
    void logout();
  };

  const createKey = () => {
    if (!newKeyName.trim()) return;
    const key = generateKey();
    setGeneratedKey(key);
    const now = new Date().toISOString().slice(0, 10);
    setApiKeys((prev) => [
      {
        id: `key-${Date.now()}`,
        name: newKeyName.trim(),
        prefix: key.slice(0, 20),
        createdAt: now,
        lastUsed: "Never",
        status: "active",
      },
      ...prev,
    ]);
    setNewKeyName("");
  };

  const copyApiKey = (key: string) => {
    void navigator.clipboard.writeText(key);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(""), 2000);
  };

  const confirmRevoke = () => {
    if (!revokeKeyId) return;
    setApiKeys((prev) =>
      prev.map((k) => (k.id === revokeKeyId ? { ...k, status: "revoked" as const } : k))
    );
    setRevokeKeyId(null);
  };

  const usageBars = [
    { label: "Tokens today", value: isPro ? 0 : 0, max: isPro ? 500000 : 10000, display: `0 / ${isPro ? "500K" : "10K"}` },
    { label: "Tokens this month", value: isPro ? 0 : 0, max: isPro ? 5000000 : 100000, display: `0 / ${isPro ? "5M" : "100K"}` },
    { label: "Spending today", value: isPro ? 0 : 0, max: isPro ? 4000 : 40, display: `₹0.00 / ${isPro ? "₹4,000" : "₹40"}` },
    { label: "Videos this month", value: 0, max: isPro ? 20 : 1, display: `0 / ${isPro ? "20" : "0"}` },
    { label: "Code generations", value: 0, max: isPro ? 10 : 1, display: `0 / ${isPro ? "10" : "0"}` },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-[#908fa0]">Manage your account, security, and billing</p>
        </div>
        <div className="flex items-center gap-2">
          <PlanBadge plan={plan?.tier} />
          <Button variant="ghost" size="sm" onClick={handleSignOut} disabled={signingOut}>
            {signingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
            Sign out
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList variant="line" className="w-full flex-wrap justify-start border-b border-[#2d3449]">
          <TabsTrigger value="profile">
            <User className="mr-2 h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="mr-2 h-4 w-4" /> Plan & Billing
          </TabsTrigger>
          <TabsTrigger value="usage">
            <Zap className="mr-2 h-4 w-4" /> AI Usage
          </TabsTrigger>
          <TabsTrigger value="github">
            <GithubMark className="mr-2 h-4 w-4" /> GitHub
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="apikeys">
            <KeyRound className="mr-2 h-4 w-4" /> API Keys
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="mr-2 h-4 w-4" /> Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-white">Profile Information</CardTitle>
                <CardAction>
                  <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-[#908fa0] hover:bg-[#171f33] hover:text-white">
                    <LogOut className="h-4 w-4" /> Sign out
                  </Button>
                </CardAction>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {saveMsg && (
                <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/15 p-3 text-sm text-emerald-400">
                  {saveMsg}
                </div>
              )}
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-xl font-bold text-white">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <Button variant="outline" size="sm" className="bg-[#0b1326]">
                    Upload Photo
                  </Button>
                  <p className="mt-1 text-xs text-[#908fa0]">JPG or PNG, max 2MB</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label className="mb-1 block text-sm font-medium text-[#dae2fd]">Name</Label>
                  <Input defaultValue={user?.name ?? ""} className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd]" />
                </div>
                <div>
                  <Label className="mb-1 block text-sm font-medium text-[#dae2fd]">Email</Label>
                  <Input defaultValue={user?.email ?? ""} type="email" className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd]" />
                </div>
                <div>
                  <Label className="mb-1 block text-sm font-medium text-[#dae2fd]">Phone</Label>
                  <Input placeholder="+91 98765 43210" className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd]" />
                </div>
                <div>
                  <Label className="mb-1 block text-sm font-medium text-[#dae2fd]">Location</Label>
                  <Input placeholder="Bangalore, India" className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd]" />
                </div>
                <div>
                  <Label className="mb-1 block text-sm font-medium text-[#dae2fd]">LinkedIn</Label>
                  <Input placeholder="linkedin.com/in/username" className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd]" />
                </div>
                <div>
                  <Label className="mb-1 block text-sm font-medium text-[#dae2fd]">GitHub</Label>
                  <Input placeholder="github.com/username" className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd]" />
                </div>
              </div>
              <Button onClick={handleSaveProfile} className="bg-indigo-500 text-white hover:bg-indigo-400">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-4">
            <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-white">Password</CardTitle>
              </CardHeader>
              <CardContent>
                {!showPasswordForm ? (
                  <Button variant="outline" size="sm" onClick={() => setShowPasswordForm(true)}>
                    Change Password
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-1 block text-sm font-medium text-[#dae2fd]">Current Password</Label>
                      <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd]" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label className="mb-1 block text-sm font-medium text-[#dae2fd]">New Password</Label>
                        <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd]" />
                      </div>
                      <div>
                        <Label className="mb-1 block text-sm font-medium text-[#dae2fd]">Confirm</Label>
                        <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd]" />
                      </div>
                    </div>
                    {passwordMsg && (
                      <p
                        className={`rounded-lg p-3 text-sm ${
                          passwordMsg.includes("successfully")
                            ? "bg-emerald-500/15 text-emerald-400"
                            : "bg-red-500/15 text-red-400"
                        }`}
                      >
                        {passwordMsg}
                      </p>
                    )}
                    <div className="flex gap-2">
                      <Button size="sm" className="bg-indigo-500 text-white hover:bg-indigo-400" onClick={handleUpdatePassword}>
                        Update Password
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setShowPasswordForm(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-white">Two-Factor Authentication (2FA)</CardTitle>
                  <Badge
                    variant="outline"
                    className={
                      twoFactorEnabled
                        ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-inset ring-emerald-500/30"
                        : "bg-amber-500/15 text-amber-400 ring-1 ring-inset ring-amber-500/30"
                    }
                  >
                    {twoFactorEnabled ? "Enabled" : "Disabled"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-3 text-sm text-[#908fa0]">
                  Add an extra layer of security with Google Authenticator or Authy.
                </p>
                {twoFactorEnabled ? (
                  <p className="text-sm text-emerald-400">
                    Two-factor authentication is active on your account.
                  </p>
                ) : (
                  <Button
                    size="sm"
                    className="bg-indigo-500 text-white hover:bg-indigo-400"
                    onClick={() => {
                      setShow2faModal(true);
                      setQrShown(false);
                      window.setTimeout(() => setQrShown(true), 1500);
                    }}
                  >
                    Enable 2FA
                  </Button>
                )}
              </CardContent>
            </Card>

            <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-white">Active Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2">
                  {sessions.map((s, i) => (
                    <div key={`${s.device}-${i}`} className="flex items-center gap-3 rounded-lg p-3 hover:bg-[#171f33]">
                      {s.device.includes("iPhone") ? (
                        <Smartphone className="h-4 w-4 text-[#908fa0]" />
                      ) : (
                        <Monitor className="h-4 w-4 text-[#908fa0]" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">
                          {s.device}{" "}
                          {s.current && (
                            <Badge variant="default" className="bg-emerald-500/15 text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
                              This device
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-[#908fa0]">
                          {s.ip} · Last active {s.lastActive}
                        </p>
                      </div>
                      {!s.current && (
                        <Button variant="outline" size="sm">
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <Button variant="destructive" size="sm" onClick={() => setShowLogoutModal(true)}>
                  <LogOut className="mr-2 h-4 w-4" /> Logout All Devices
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="billing">
          <div className="space-y-4">
            <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-white">Current Plan</CardTitle>
                  <PlanBadge plan={plan?.tier} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-[#908fa0]">
                  {isPro
                    ? "You have full access to all AI features."
                    : "Upgrade for unlimited AI resumes, tailoring, and video demos."}
                </p>
                {!isPro && (
                  <Button
                    onClick={handleUpgrade}
                    disabled={upgrading}
                    className="bg-indigo-500 text-white hover:bg-indigo-400"
                  >
                    {upgrading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Redirecting to Razorpay...
                      </>
                    ) : (
                      <>Upgrade to Pro - ₹299/mo</>
                    )}
                  </Button>
                )}
                {upgradeNote && <p className="mt-3 text-xs text-[#908fa0]">{upgradeNote}</p>}
                {isPro && (
                  <Button variant="destructive" size="sm">
                    Cancel Subscription
                  </Button>
                )}
                <div className="mt-4 flex items-center gap-2 text-xs text-[#908fa0]">
                  <span>Need to manage payment methods or invoices?</span>
                  <Link href="/pricing" className="text-indigo-400 hover:underline">
                    View pricing
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-white">Plan Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1c2440]">
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-[#908fa0]">
                          Feature
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-[#908fa0]">
                          Free
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-[#908fa0]">
                          Pro
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map(([f, free, pro]) => (
                        <tr key={f} className="border-b border-[#1c2440] last:border-0">
                          <td className="px-4 py-3 font-medium text-[#dae2fd]">{f}</td>
                          <td className="px-4 py-3 text-center text-[#908fa0]">{free}</td>
                          <td className="px-4 py-3 text-center font-medium text-indigo-400">{pro}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-white">Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {payments.map((p, i) => (
                    <div key={`${p.date}-${i}`} className="flex items-center justify-between rounded-lg p-3 hover:bg-[#171f33]">
                      <div>
                        <p className="text-sm font-medium text-white">{p.plan}</p>
                        <p className="text-xs text-[#908fa0]">{p.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-[#dae2fd]">{p.amount}</span>
                        <Badge variant="default" className="bg-emerald-500/15 text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
                          {p.status}
                        </Badge>
                        <Button variant="outline" size="icon-sm" className="bg-[#0b1326]">
                          <Download className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
            <CardHeader>
              <CardTitle className="text-base text-white">AI Usage Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {usageBars.map((bar) => (
                <div key={bar.label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-[#908fa0]">{bar.label}</span>
                    <span className="text-[#dae2fd]">{bar.display}</span>
                  </div>
                  <Progress value={(bar.value / Math.max(bar.max, 1)) * 100} className="[&_[data-slot=progress-track]]:bg-[#171f33]" />
                </div>
              ))}
              {!isPro && (
                <p className="text-xs text-[#908fa0]">
                  Running low?{" "}
                  <Link href="/app/settings?tab=billing" className="text-indigo-400 hover:underline">
                    Upgrade to Pro
                  </Link>{" "}
                  for higher limits.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="github">
          <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
            <CardHeader>
              <CardTitle className="text-base text-white">GitHub Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center justify-between rounded-lg bg-[#0b1326] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#060e20]">
                    <GithubMark className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {githubConnected ? "Connected to @username" : "Not connected"}
                    </p>
                    <p className="text-xs text-[#908fa0]">
                      Connect to auto-push generated projects
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-indigo-500 text-white hover:bg-indigo-400"
                  onClick={() => setGithubConnected((c) => !c)}
                >
                  {githubConnected ? "Disconnect" : "Connect GitHub"}
                </Button>
              </div>
              <p className="text-xs text-[#908fa0]">
                We only request scoped access (repo creation + push). Your token is encrypted at rest.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
            <CardHeader>
              <CardTitle className="text-base text-white">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: "email", label: "Email notifications", desc: "Follow-up reminders, deployment status, AI usage alerts", val: emailNotif, set: setEmailNotif },
                { id: "push", label: "Push notifications", desc: "Real-time alerts in your browser", val: pushNotif, set: setPushNotif },
                { id: "security", label: "Security alerts", desc: "Login from new device, rate limit hits, 2FA events", val: securityNotif, set: setSecurityNotif },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-[#2d3449] p-4">
                  <div>
                    <p className="text-sm font-medium text-white">{item.label}</p>
                    <p className="text-xs text-[#908fa0]">{item.desc}</p>
                  </div>
                  <Switch
                    checked={item.val}
                    onCheckedChange={(checked) => item.set(checked)}
                    className="data-checked:bg-[#6366f1]"
                  />
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apikeys">
          <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-white">API Keys</CardTitle>
                <Button size="sm" className="bg-indigo-500 text-white hover:bg-indigo-400" onClick={() => setShowCreateKey(true)}>
                  Create Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-[#908fa0]">
                Keys are used to authenticate requests to the Candidexa API. Treat them like passwords.
              </p>
              {!generatedKey && apiKeys.length === 0 ? (
                <p className="text-sm text-[#dae2fd]">No API keys yet. Create one to get started.</p>
              ) : (
                <div className="space-y-2">
                  {generatedKey && (
                    <div className="mb-3 flex items-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 p-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-indigo-300">New key created — copy it now</p>
                        <code className="break-all font-mono text-sm text-[#dae2fd]">{generatedKey}</code>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => copyApiKey(generatedKey)} className="shrink-0 bg-[#0b1326]">
                        {copiedKey === generatedKey ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        {copiedKey === generatedKey ? "Copied" : "Copy"}
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => setGeneratedKey("")} className="shrink-0 text-[#908fa0] hover:text-white" aria-label="Dismiss">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {apiKeys.map((k) => (
                    <div key={k.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#2d3449] p-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#171f33]">
                          <KeyRound className="h-4 w-4 text-indigo-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-white">{k.name}</p>
                          <p className="truncate font-mono text-xs text-[#908fa0]">{k.prefix}...</p>
                          <p className="text-xs text-[#908fa0]">
                            Created {k.createdAt} · Last used {k.lastUsed}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            k.status === "active"
                              ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-inset ring-emerald-500/30"
                              : "bg-[#171f33] text-[#908fa0]"
                          }
                        >
                          {k.status}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          disabled={k.status === "revoked"}
                          onClick={() => setRevokeKeyId(k.id)}
                        >
                          Revoke
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-white">Accent Color</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-[#908fa0]">
                  Choose the accent used across your workspace. Theme stays fixed to Obsidian dark.
                </p>
                <div className="flex flex-wrap gap-3">
                  {accentOptions.map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => setAccent(opt)}
                      className={`flex items-center gap-2 rounded-lg border-2 px-3 py-2 transition-all ${
                        accent.name === opt.name
                          ? "border-indigo-500 bg-indigo-500/10"
                          : "border-[#2d3449] hover:border-[#3a4160]"
                      }`}
                    >
                      <span className="h-5 w-5 rounded-full" style={{ background: opt.value }} />
                      <span className="text-sm font-medium text-white">{opt.name}</span>
                      {accent.name === opt.name && <Check className="h-4 w-4 text-indigo-400" />}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#131b2e] border-[#2d3449] shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-white">Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border border-[#2d3449] p-4">
                  <div>
                    <p className="text-sm font-medium text-white">Reduce motion</p>
                    <p className="text-xs text-[#908fa0]">Minimize animations across the app</p>
                  </div>
                  <Switch
                    checked={reduceMotion}
                    onCheckedChange={setReduceMotion}
                    className="data-checked:bg-[#6366f1]"
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-[#2d3449] p-4">
                  <div>
                    <p className="text-sm font-medium text-white">Compact density</p>
                    <p className="text-xs text-[#908fa0]">Fit more content on screen</p>
                  </div>
                  <Switch
                    checked={compactDensity}
                    onCheckedChange={setCompactDensity}
                    className="data-checked:bg-[#6366f1]"
                  />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-[#2d3449] p-4">
                  <div>
                    <p className="text-sm font-medium text-white">Export my data</p>
                    <p className="text-xs text-[#908fa0]">Download everything we store about you</p>
                  </div>
                  <Button variant="outline" size="sm" className="bg-[#0b1326]">
                    <Download className="mr-2 h-3 w-3" /> Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={show2faModal} onOpenChange={setShow2faModal}>
        <DialogContent className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd]">
          <DialogHeader>
            <DialogTitle className="text-white">Enable Two-Factor Authentication</DialogTitle>
            <DialogDescription className="text-[#908fa0]">
              Scan the QR code with your authenticator app to link this account.
            </DialogDescription>
          </DialogHeader>
          {!qrShown ? (
            <div className="py-6 text-center">
              <Shield className="mx-auto mb-3 h-10 w-10 text-indigo-400" />
              <p className="text-sm text-[#908fa0]">Generating QR code...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-lg bg-[#171f33]">
                <div className="grid grid-cols-7 gap-0.5">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div
                      key={i}
                      className={`h-2.5 w-2.5 ${
                        (i * 7 + i * 3 + Math.floor(i / 3)) % 2 === 0 ? "bg-white" : "bg-transparent"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-center text-xs text-[#908fa0]">
                Scan with Google Authenticator or Authy
              </p>
              <div className="rounded-lg bg-[#171f33] p-3 text-center">
                <p className="mb-1 text-xs text-[#908fa0]">Backup codes (save these):</p>
                <code className="text-xs text-[#dae2fd]">ABCD-EFGH-IJKL-MNOP</code>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-[#0b1326]">
                  <Download className="mr-2 h-4 w-4" /> Download Codes
                </Button>
                <Button className="flex-1 bg-indigo-500 text-white hover:bg-indigo-400" onClick={enable2fa}>
                  Verify & Enable
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateKey} onOpenChange={setShowCreateKey}>
        <DialogContent className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd]">
          <DialogHeader>
            <DialogTitle className="text-white">Create API Key</DialogTitle>
            <DialogDescription className="text-[#908fa0]">
              Give your key a name so you can recognize it later.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-[#dae2fd]">Key name</Label>
            <Input
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="e.g. Production, CI pipeline"
              className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd]"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  createKey();
                }
              }}
            />
          </div>
          <DialogFooter>
            <DialogClose
              render={
                <Button variant="outline" className="border-[#2d3449] bg-transparent text-white hover:bg-[#171f33]">
                  Cancel
                </Button>
              }
            />
            <Button
              className="bg-indigo-500 text-white hover:bg-indigo-400"
              onClick={createKey}
              disabled={!newKeyName.trim()}
            >
              Create Key
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={revokeKeyId !== null}
        onOpenChange={(open) => !open && setRevokeKeyId(null)}
        title="Revoke API key"
        description="This key will stop working immediately. Any integrations using it will fail until updated."
        confirmLabel="Revoke Key"
        destructive
        onConfirm={confirmRevoke}
      />

      <Dialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
        <DialogContent className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd]">
          <DialogHeader>
            <DialogTitle className="text-white">Logout All Devices</DialogTitle>
            <DialogDescription className="text-[#908fa0]">
              This will log you out of all devices and end your session everywhere.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-[#dae2fd]">
            After logging out you will need to sign in again on each device.
          </p>
          <DialogFooter>
            <DialogClose
              render={
                <Button variant="outline" className="border-[#2d3449] bg-transparent text-white hover:bg-[#171f33]">
                  Cancel
                </Button>
              }
            />
            <Button variant="destructive" onClick={confirmLogoutAll}>
              Logout All
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <Suspense fallback={null}>
      <SettingsContent />
    </Suspense>
  );
}