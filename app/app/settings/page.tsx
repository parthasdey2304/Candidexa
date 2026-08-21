"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";
import { designStyles, getStoredDesignStyle, setStoredDesignStyle, applyAccent, getStoredAccent, type DesignStyleId } from "@/lib/design-styles";
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
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [designStyle, setDesignStyle] = useState<DesignStyleId>("modern");
  const [styleNotice, setStyleNotice] = useState("");
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

  useEffect(() => {
    const storedStyle = getStoredDesignStyle();
    setDesignStyle(storedStyle);
    const storedAccent = getStoredAccent();
    if (storedAccent) {
      const found = accentOptions.find((a) => a.value === storedAccent);
      if (found) setAccent(found);
      else setAccent({ name: "Custom", value: storedAccent });
    }
  }, []);

  const handleStyleChange = (id: DesignStyleId) => {
    setDesignStyle(id);
    setStoredDesignStyle(id);
    const name = designStyles.find((s) => s.id === id)?.name ?? id;
    setStyleNotice(`Applied ${name} — entire workspace updated`);
    window.setTimeout(() => setStyleNotice(""), 3000);
  };

  const handleAccentChange = (opt: typeof accentOptions[number]) => {
    setAccent(opt);
    applyAccent(opt.value);
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
          <h1 className="text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account, security, and billing</p>
        </div>
        <div className="flex items-center gap-2">
          <PlanBadge plan={plan?.tier} />
          <Button variant="ghost" size="sm" onClick={handleSignOut} disabled={signingOut}>
            {signingOut ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogOut className="mr-2 h-4 w-4" />}
            Sign out
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full min-w-0">
        <TabsList variant="line" className="w-full max-w-full justify-start border-b border-border overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex-nowrap h-auto min-h-10 py-1 gap-0">
          <TabsTrigger value="profile" className="shrink-0 flex-none whitespace-nowrap">
            <User className="mr-2 h-4 w-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="shrink-0 flex-none whitespace-nowrap">
            <Shield className="mr-2 h-4 w-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="billing" className="shrink-0 flex-none whitespace-nowrap">
            <CreditCard className="mr-2 h-4 w-4" /> Plan & Billing
          </TabsTrigger>
          <TabsTrigger value="usage" className="shrink-0 flex-none whitespace-nowrap">
            <Zap className="mr-2 h-4 w-4" /> AI Usage
          </TabsTrigger>
          <TabsTrigger value="github" className="shrink-0 flex-none whitespace-nowrap">
            <GithubMark className="mr-2 h-4 w-4" /> GitHub
          </TabsTrigger>
          <TabsTrigger value="notifications" className="shrink-0 flex-none whitespace-nowrap">
            <Bell className="mr-2 h-4 w-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="apikeys" className="shrink-0 flex-none whitespace-nowrap">
            <KeyRound className="mr-2 h-4 w-4" /> API Keys
          </TabsTrigger>
          <TabsTrigger value="appearance" className="shrink-0 flex-none whitespace-nowrap">
            <Palette className="mr-2 h-4 w-4" /> Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="bg-card border-border shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-foreground">Profile Information</CardTitle>
                <CardAction>
                  <Button variant="ghost" size="sm" onClick={handleSignOut} className="text-muted-foreground hover:bg-muted hover:text-foreground">
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
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-xl font-bold text-foreground">
                  {user?.name?.[0]?.toUpperCase() || "U"}
                </div>
                <div>
                  <Button variant="outline" size="sm" className="bg-muted">
                    Upload Photo
                  </Button>
                  <p className="mt-1 text-xs text-muted-foreground">JPG or PNG, max 2MB</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label className="mb-1 block text-sm font-medium text-foreground">Name</Label>
                  <Input defaultValue={user?.name ?? ""} className="border-border bg-muted text-foreground" />
                </div>
                <div>
                  <Label className="mb-1 block text-sm font-medium text-foreground">Email</Label>
                  <Input defaultValue={user?.email ?? ""} type="email" className="border-border bg-muted text-foreground" />
                </div>
                <div>
                  <Label className="mb-1 block text-sm font-medium text-foreground">Phone</Label>
                  <Input placeholder="+91 98765 43210" className="border-border bg-muted text-foreground" />
                </div>
                <div>
                  <Label className="mb-1 block text-sm font-medium text-foreground">Location</Label>
                  <Input placeholder="Bangalore, India" className="border-border bg-muted text-foreground" />
                </div>
                <div>
                  <Label className="mb-1 block text-sm font-medium text-foreground">LinkedIn</Label>
                  <Input placeholder="linkedin.com/in/username" className="border-border bg-muted text-foreground" />
                </div>
                <div>
                  <Label className="mb-1 block text-sm font-medium text-foreground">GitHub</Label>
                  <Input placeholder="github.com/username" className="border-border bg-muted text-foreground" />
                </div>
              </div>
              <Button onClick={handleSaveProfile} className="bg-indigo-500 text-foreground hover:bg-indigo-400">
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-4">
            <Card className="bg-card border-border shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-foreground">Password</CardTitle>
              </CardHeader>
              <CardContent>
                {!showPasswordForm ? (
                  <Button variant="outline" size="sm" onClick={() => setShowPasswordForm(true)}>
                    Change Password
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label className="mb-1 block text-sm font-medium text-foreground">Current Password</Label>
                      <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="border-border bg-muted text-foreground" />
                    </div>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <div>
                        <Label className="mb-1 block text-sm font-medium text-foreground">New Password</Label>
                        <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="border-border bg-muted text-foreground" />
                      </div>
                      <div>
                        <Label className="mb-1 block text-sm font-medium text-foreground">Confirm</Label>
                        <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="border-border bg-muted text-foreground" />
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
                      <Button size="sm" className="bg-indigo-500 text-foreground hover:bg-indigo-400" onClick={handleUpdatePassword}>
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

            <Card className="bg-card border-border shadow-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-foreground">Two-Factor Authentication (2FA)</CardTitle>
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
                <p className="mb-3 text-sm text-muted-foreground">
                  Add an extra layer of security with Google Authenticator or Authy.
                </p>
                {twoFactorEnabled ? (
                  <p className="text-sm text-emerald-400">
                    Two-factor authentication is active on your account.
                  </p>
                ) : (
                  <Button
                    size="sm"
                    className="bg-indigo-500 text-foreground hover:bg-indigo-400"
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

            <Card className="bg-card border-border shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-foreground">Active Sessions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4 space-y-2">
                  {sessions.map((s, i) => (
                    <div key={`${s.device}-${i}`} className="flex items-center gap-3 rounded-lg p-3 hover:bg-muted">
                      {s.device.includes("iPhone") ? (
                        <Smartphone className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Monitor className="h-4 w-4 text-muted-foreground" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">
                          {s.device}{" "}
                          {s.current && (
                            <Badge variant="default" className="bg-emerald-500/15 text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
                              This device
                            </Badge>
                          )}
                        </p>
                        <p className="text-xs text-muted-foreground">
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
            <Card className="bg-card border-border shadow-none">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base text-foreground">Current Plan</CardTitle>
                  <PlanBadge plan={plan?.tier} />
                </div>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">
                  {isPro
                    ? "You have full access to all AI features."
                    : "Upgrade for unlimited AI resumes, tailoring, and video demos."}
                </p>
                {!isPro && (
                  <Button
                    onClick={handleUpgrade}
                    disabled={upgrading}
                    className="bg-indigo-500 text-foreground hover:bg-indigo-400"
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
                {upgradeNote && <p className="mt-3 text-xs text-muted-foreground">{upgradeNote}</p>}
                {isPro && (
                  <Button variant="destructive" size="sm">
                    Cancel Subscription
                  </Button>
                )}
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <span>Need to manage payment methods or invoices?</span>
                  <Link href="/pricing" className="text-indigo-400 hover:underline">
                    View pricing
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-foreground">Plan Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Feature
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Free
                        </th>
                        <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          Pro
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map(([f, free, pro]) => (
                        <tr key={f} className="border-b border-border last:border-0">
                          <td className="px-4 py-3 font-medium text-foreground">{f}</td>
                          <td className="px-4 py-3 text-center text-muted-foreground">{free}</td>
                          <td className="px-4 py-3 text-center font-medium text-indigo-400">{pro}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border shadow-none">
              <CardHeader>
                <CardTitle className="text-base text-foreground">Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {payments.map((p, i) => (
                    <div key={`${p.date}-${i}`} className="flex items-center justify-between rounded-lg p-3 hover:bg-muted">
                      <div>
                        <p className="text-sm font-medium text-foreground">{p.plan}</p>
                        <p className="text-xs text-muted-foreground">{p.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-foreground">{p.amount}</span>
                        <Badge variant="default" className="bg-emerald-500/15 text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
                          {p.status}
                        </Badge>
                        <Button variant="outline" size="icon-sm" className="bg-muted">
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
          <Card className="bg-card border-border shadow-none">
            <CardHeader>
              <CardTitle className="text-base text-foreground">AI Usage Dashboard</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              {usageBars.map((bar) => (
                <div key={bar.label}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="text-muted-foreground">{bar.label}</span>
                    <span className="text-foreground">{bar.display}</span>
                  </div>
                  <Progress value={(bar.value / Math.max(bar.max, 1)) * 100} className="[&_[data-slot=progress-track]]:bg-muted" />
                </div>
              ))}
              {!isPro && (
                <p className="text-xs text-muted-foreground">
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
          <Card className="bg-card border-border shadow-none">
            <CardHeader>
              <CardTitle className="text-base text-foreground">GitHub Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4 flex items-center justify-between rounded-lg bg-muted p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#060e20]">
                    <GithubMark className="h-5 w-5 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {githubConnected ? "Connected to @username" : "Not connected"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Connect to auto-push generated projects
                    </p>
                  </div>
                </div>
                <Button
                  size="sm"
                  className="bg-indigo-500 text-foreground hover:bg-indigo-400"
                  onClick={() => setGithubConnected((c) => !c)}
                >
                  {githubConnected ? "Disconnect" : "Connect GitHub"}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                We only request scoped access (repo creation + push). Your token is encrypted at rest.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="bg-card border-border shadow-none">
            <CardHeader>
              <CardTitle className="text-base text-foreground">Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: "email", label: "Email notifications", desc: "Follow-up reminders, deployment status, AI usage alerts", val: emailNotif, set: setEmailNotif },
                { id: "push", label: "Push notifications", desc: "Real-time alerts in your browser", val: pushNotif, set: setPushNotif },
                { id: "security", label: "Security alerts", desc: "Login from new device, rate limit hits, 2FA events", val: securityNotif, set: setSecurityNotif },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.desc}</p>
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
          <Card className="bg-card border-border shadow-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base text-foreground">API Keys</CardTitle>
                <Button size="sm" className="bg-indigo-500 text-foreground hover:bg-indigo-400" onClick={() => setShowCreateKey(true)}>
                  Create Key
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Keys are used to authenticate requests to the Candidexa API. Treat them like passwords.
              </p>
              {!generatedKey && apiKeys.length === 0 ? (
                <p className="text-sm text-foreground">No API keys yet. Create one to get started.</p>
              ) : (
                <div className="space-y-2">
                  {generatedKey && (
                    <div className="mb-3 flex items-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/10 p-3">
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-indigo-300">New key created — copy it now</p>
                        <code className="break-all font-mono text-sm text-foreground">{generatedKey}</code>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => copyApiKey(generatedKey)} className="shrink-0 bg-muted">
                        {copiedKey === generatedKey ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                        {copiedKey === generatedKey ? "Copied" : "Copy"}
                      </Button>
                      <Button variant="ghost" size="icon-sm" onClick={() => setGeneratedKey("")} className="shrink-0 text-muted-foreground hover:text-foreground" aria-label="Dismiss">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  {apiKeys.map((k) => (
                    <div key={k.id} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-muted">
                          <KeyRound className="h-4 w-4 text-indigo-400" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground">{k.name}</p>
                          <p className="truncate font-mono text-xs text-muted-foreground">{k.prefix}...</p>
                          <p className="text-xs text-muted-foreground">
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
                              : "bg-muted text-muted-foreground"
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
          <div className="space-y-6">
            {styleNotice && (
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                {styleNotice}
              </div>
            )}

            {/* Theme Mode + Accent */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Theme Mode</CardTitle>
                  <p className="text-sm text-muted-foreground">Choose light, dark, or follow system — affects entire /app workspace.</p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "light", label: "Light", icon: "☀️" },
                      { id: "dark", label: "Dark", icon: "🌙" },
                      { id: "system", label: "System", icon: "💻" },
                    ].map((m) => (
                      <button
                        key={m.id}
                        onClick={() => setTheme(m.id)}
                        className={`flex flex-col items-center gap-1.5 rounded-xl border-2 px-3 py-4 text-sm font-medium transition-all ${
                          theme === m.id
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-card hover:border-primary/40 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="text-lg leading-none">{m.icon}</span>
                        <span>{m.label}</span>
                        {theme === m.id && <Check className="h-3.5 w-3.5 text-primary" />}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">Current: <span className="font-medium text-foreground">{resolvedTheme ?? theme}</span> • Try switching and watch the header/sidebar update instantly.</p>
                </CardContent>
              </Card>

              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-base">Accent Color</CardTitle>
                  <p className="text-sm text-muted-foreground">Applied globally via --primary. Updates buttons, links, and active states.</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2.5">
                    {accentOptions.map((opt) => (
                      <button
                        key={opt.name}
                        onClick={() => handleAccentChange(opt)}
                        className={`flex items-center gap-2 rounded-full border-2 px-3 py-2 text-sm font-medium transition-all ${
                          accent.value === opt.value
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-card hover:border-primary/40 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="h-5 w-5 rounded-full border border-border" style={{ background: opt.value }} />
                        {opt.name}
                        {accent.value === opt.value && <Check className="h-3.5 w-3.5 text-primary" />}
                      </button>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">Also works with any Design Style below.</p>
                </CardContent>
              </Card>
            </div>

            {/* Design Style Picker - from first image */}
            <Card className="shadow-sm overflow-hidden">
              <CardHeader>
                <CardTitle className="text-base">Design Style</CardTitle>
                <p className="text-sm text-muted-foreground">Pick a style for the entire /app workspace. The whole UI updates instantly — sidebar, cards, buttons, and radius.</p>
              </CardHeader>
              <CardContent className="space-y-8">
                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Recommended</h4>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">{designStyles.filter((s) => s.group === "recommended").length}</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    {designStyles
                      .filter((s) => s.group === "recommended")
                      .map((style) => {
                        const isActive = designStyle === style.id;
                        return (
                          <button
                            key={style.id}
                            onClick={() => handleStyleChange(style.id)}
                            className={`group text-left rounded-xl border-2 bg-card p-3 text-card-foreground transition-all hover:shadow-md text-sm ${isActive ? "border-primary shadow-md shadow-primary/10" : "border-border hover:border-primary/30"}`}
                          >
                            <div className="overflow-hidden rounded-lg border border-border bg-background">
                              <div className="flex items-center justify-between px-3 py-2 border-b border-border/60">
                                <span className="text-[10px] font-medium tracking-wide text-muted-foreground">Aa Design system</span>
                                <span className="flex gap-1">
                                  {style.dots.map((c, i) => (
                                    <span key={i} className="h-2.5 w-2.5 rounded-sm border border-border" style={{ background: c }} />
                                  ))}
                                </span>
                              </div>
                              <div className="grid grid-cols-5 gap-2 p-3">
                                <div className="col-span-3">
                                  <p className="text-xs font-semibold leading-none">Heading</p>
                                  <p className="mt-1 text-[10px] leading-tight text-muted-foreground">Clear, reusable interface elements.</p>
                                  <div className="mt-2.5 flex gap-1.5">
                                    <span className="rounded px-2 py-1 text-[10px] font-medium" style={{ background: style.preview.primary, color: style.preview.primaryText, border: style.preview.border ? `1px solid ${style.preview.border}` : undefined }}>Primary</span>
                                    <span className="rounded border border-border bg-card px-2 py-1 text-[10px]">Button</span>
                                  </div>
                                </div>
                                <div className="col-span-2 rounded-md border p-2 flex flex-col justify-center" style={{ background: style.preview.totalBg, borderColor: style.preview.border ?? "transparent" }}>
                                  <span className="text-[10px] text-muted-foreground">Total</span>
                                  <span className="text-sm font-bold leading-none">$24.8k</span>
                                  <span className="mt-1.5 h-1.5 w-full rounded-full bg-background/80"><span className="block h-1.5 rounded-full" style={{ width: "68%", background: style.preview.totalAccent }} /></span>
                                </div>
                              </div>
                              {isActive ? <div className="h-1 bg-primary" /> : <div className="h-1 bg-transparent group-hover:bg-primary/40" />}
                            </div>
                            <p className="mt-2.5 font-semibold leading-none">{style.name}</p>
                            <p className="mt-1 text-xs text-muted-foreground">{style.description}</p>
                            {isActive && <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-primary"><Check className="h-3 w-3" /> Active</span>}
                          </button>
                        );
                      })}
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center gap-3">
                    <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">More styles</h4>
                    <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">{designStyles.filter((s) => s.group === "more").length}</span>
                    <div className="h-px flex-1 bg-border" />
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {designStyles
                      .filter((s) => s.group === "more")
                      .map((style) => {
                        const isActive = designStyle === style.id;
                        return (
                          <button
                            key={style.id}
                            onClick={() => handleStyleChange(style.id)}
                            className={`group text-left rounded-xl border-2 bg-card p-3 text-card-foreground transition-all hover:shadow-md text-sm ${isActive ? "border-primary shadow-md shadow-primary/10" : "border-border hover:border-primary/30"}`}
                          >
                            <div className="overflow-hidden rounded-lg border border-border bg-background">
                              <div className="flex items-center justify-between px-2.5 py-2 border-b border-border/60">
                                <span className="text-[10px] font-medium tracking-wide text-muted-foreground">Aa Design system</span>
                                <span className="flex gap-1">
                                  {style.dots.map((c, i) => (
                                    <span key={i} className="h-2 w-2 rounded-sm border border-border" style={{ background: c }} />
                                  ))}
                                </span>
                              </div>
                              <div className="grid grid-cols-5 gap-2 p-2.5">
                                <div className="col-span-3">
                                  <p className="text-[11px] font-semibold leading-none">Heading</p>
                                  <p className="mt-1 text-[9px] leading-tight text-muted-foreground">Clear, reusable...</p>
                                  <div className="mt-2 flex gap-1">
                                    <span className="rounded px-1.5 py-1 text-[9px] font-medium" style={{ background: style.preview.primary, color: style.preview.primaryText }}>Primary</span>
                                    <span className="rounded border border-border bg-card px-1.5 py-1 text-[9px]">Button</span>
                                  </div>
                                </div>
                                <div className="col-span-2 rounded-md border p-1.5 flex flex-col justify-center" style={{ background: style.preview.totalBg }}>
                                  <span className="text-[9px] text-muted-foreground">Total</span>
                                  <span className="text-xs font-bold">$24.8k</span>
                                  <span className="mt-1 h-1 w-full rounded-full bg-background/80"><span className="block h-1 rounded-full" style={{ width: "62%", background: style.preview.totalAccent }} /></span>
                                </div>
                              </div>
                              {isActive ? <div className="h-1 bg-primary" /> : <div className="h-1 bg-transparent group-hover:bg-primary/30" />}
                            </div>
                            <p className="mt-2 font-semibold text-sm leading-none">{style.name}</p>
                            <p className="mt-1 text-xs text-muted-foreground line-clamp-1">{style.description}</p>
                          </button>
                        );
                      })}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">All styles update <span className="font-medium text-foreground">every route under /app</span> — Dashboard, JD Analyzer, Tailor, etc. Light/dark still works on top of each style.</p>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base">Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between rounded-xl border border-border p-4">
                  <div>
                    <p className="text-sm font-medium">Reduce motion</p>
                    <p className="text-xs text-muted-foreground">Minimize animations across the app</p>
                  </div>
                  <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border p-4">
                  <div>
                    <p className="text-sm font-medium">Compact density</p>
                    <p className="text-xs text-muted-foreground">Fit more content on screen</p>
                  </div>
                  <Switch checked={compactDensity} onCheckedChange={setCompactDensity} />
                </div>
                <div className="flex items-center justify-between rounded-xl border border-border p-4">
                  <div>
                    <p className="text-sm font-medium">Export my data</p>
                    <p className="text-xs text-muted-foreground">Download everything we store about you</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-3 w-3" /> Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={show2faModal} onOpenChange={setShow2faModal}>
        <DialogContent className="border-border bg-muted text-foreground">
          <DialogHeader>
            <DialogTitle className="text-foreground">Enable Two-Factor Authentication</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Scan the QR code with your authenticator app to link this account.
            </DialogDescription>
          </DialogHeader>
          {!qrShown ? (
            <div className="py-6 text-center">
              <Shield className="mx-auto mb-3 h-10 w-10 text-indigo-400" />
              <p className="text-sm text-muted-foreground">Generating QR code...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-lg bg-muted">
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
              <p className="text-center text-xs text-muted-foreground">
                Scan with Google Authenticator or Authy
              </p>
              <div className="rounded-lg bg-muted p-3 text-center">
                <p className="mb-1 text-xs text-muted-foreground">Backup codes (save these):</p>
                <code className="text-xs text-foreground">ABCD-EFGH-IJKL-MNOP</code>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1 bg-muted">
                  <Download className="mr-2 h-4 w-4" /> Download Codes
                </Button>
                <Button className="flex-1 bg-indigo-500 text-foreground hover:bg-indigo-400" onClick={enable2fa}>
                  Verify & Enable
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showCreateKey} onOpenChange={setShowCreateKey}>
        <DialogContent className="border-border bg-muted text-foreground">
          <DialogHeader>
            <DialogTitle className="text-foreground">Create API Key</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Give your key a name so you can recognize it later.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground">Key name</Label>
            <Input
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
              placeholder="e.g. Production, CI pipeline"
              className="border-border bg-muted text-foreground"
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
                <Button variant="outline" className="border-border bg-transparent text-foreground hover:bg-muted">
                  Cancel
                </Button>
              }
            />
            <Button
              className="bg-indigo-500 text-foreground hover:bg-indigo-400"
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
        <DialogContent className="border-border bg-muted text-foreground">
          <DialogHeader>
            <DialogTitle className="text-foreground">Logout All Devices</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              This will log you out of all devices and end your session everywhere.
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-foreground">
            After logging out you will need to sign in again on each device.
          </p>
          <DialogFooter>
            <DialogClose
              render={
                <Button variant="outline" className="border-border bg-transparent text-foreground hover:bg-muted">
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