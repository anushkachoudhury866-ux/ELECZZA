"use client";
import * as React from "react";
import Link from "next/link";
import { BrassButton } from "@/components/theme/brass-button";
import { Button } from "@/components/ui/button";
import { Shield, Compass, Users } from "lucide-react";

export default function QuizLobbyPage() {
  return (
    <div className="mx-auto max-w-3xl space-y-8 py-6">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-amber/40 bg-surface px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-widest text-amber">
          <Shield className="h-3.5 w-3.5" />
          Case Briefing Room — 221B Bureau
        </div>
        <h1 className="font-script text-3xl leading-tight text-parchment">
          Investigation Briefing Room
        </h1>
        <p className="mx-auto max-w-md text-xs text-muted-foreground leading-relaxed">
          Scotland Yard official case briefing console. Operatives assemble here
          prior to active deduction deployment.
        </p>
      </div>

      {/* Briefing Room Empty State */}
      <div className="wood-panel rounded-xl p-8 text-center space-y-4">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-amber/40 bg-surface text-amber">
          <Compass className="h-7 w-7 text-amber" />
        </div>

        <div className="space-y-1">
          <h2 className="font-serif text-xl font-bold text-parchment">
            No Active Case Briefing Scheduled
          </h2>
          <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed">
            There is currently no live case awaiting agency deployment. You can
            review active case files or visit Agency HQ to charter or enlist
            your agency.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
          <Link href="/quiz" className="w-full sm:w-auto">
            <BrassButton size="md" withLoupe className="w-full">
              Active Case Files
            </BrassButton>
          </Link>
          <Link href="/team" className="w-full sm:w-auto">
            <Button variant="outline" size="default" className="w-full">
              <Users className="h-4 w-4 mr-1.5 text-amber" />
              Agency HQ
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
