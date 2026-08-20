"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import Link from "next/link";

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  destructive = false,
  onConfirm,
  loading = false,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  destructive?: boolean;
  onConfirm?: () => void;
  loading?: boolean;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd]">
        <DialogHeader>
          <DialogTitle className="text-white">{title}</DialogTitle>
          <DialogDescription className="text-[#908fa0]">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" className="border-[#2d3449] bg-transparent text-white hover:bg-[#171f33]">{cancelLabel}</Button>} />
          <Button
            variant={destructive ? "destructive" : "default"}
            disabled={loading}
            onClick={onConfirm}
          >
            {loading ? "Please wait..." : confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function UpgradePrompt({
  open,
  onOpenChange,
  feature,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  feature: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="border-[#2d3449] bg-[#0b1326] text-[#dae2fd] sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/30">
            <Zap className="size-6" />
          </div>
          <DialogTitle className="text-white">Upgrade to access {feature}</DialogTitle>
          <DialogDescription className="text-[#908fa0]">
            Pro unlocks batch tailoring, code generation, deployments, video demos, and more AI credits every month.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Link href="/app/settings?tab=billing" className="inline-flex h-9 items-center justify-center rounded-lg bg-indigo-500 px-4 text-sm font-medium text-white transition-colors hover:bg-indigo-400">
            View plans
          </Link>
          <DialogClose render={<Button variant="ghost" className="text-[#908fa0] hover:bg-[#171f33] hover:text-white">Maybe later</Button>} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}