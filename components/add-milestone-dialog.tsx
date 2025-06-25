"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface AddMilestoneDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AddMilestoneDialog({ open, onOpenChange }: AddMilestoneDialogProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Milestone</DialogTitle>
          <DialogDescription>Create a new milestone for this project.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="milestoneName">Milestone Name</Label>
            <Input id="milestoneName" placeholder="Foundation Complete" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="milestoneDescription">Description</Label>
            <Textarea id="milestoneDescription" placeholder="All foundation work completed and inspected..." />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetDate">Target Date</Label>
              <Input id="targetDate" type="date" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="paymentAmount">Payment Amount</Label>
              <Input id="paymentAmount" type="number" placeholder="5000" />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Milestone</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
