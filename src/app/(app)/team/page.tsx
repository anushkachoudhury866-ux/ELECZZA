"use client";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createTeamSchema,
  joinTeamSchema,
  type CreateTeamInput,
  type JoinTeamInput,
} from "@/lib/validators/team";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BrassButton } from "@/components/theme/brass-button";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "@/lib/motion";
import {
  Users,
  KeyRound,
  ShieldCheck,
  UserCheck,
  Crown,
  UserMinus,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import type { DetectiveAgency, TeamRole } from "@/types/team.types";

const ROLE_LABELS: Record<TeamRole, string> = {
  LEAD_INSPECTOR: "Lead Inspector",
  CRYPTANALYST: "Cryptanalyst",
  FIELD_AGENT: "Field Agent",
};

const ROLE_OPTIONS: TeamRole[] = [
  "LEAD_INSPECTOR",
  "CRYPTANALYST",
  "FIELD_AGENT",
];

function createCharteredAgency(data: CreateTeamInput): DetectiveAgency {
  const generatedPasscode = Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase();
  return {
    id: `agency-${Date.now()}`,
    name: data.name,
    motto: data.motto,
    passcode: generatedPasscode,
    leaderId: "current-user",
    members: [
      {
        userId: "current-user",
        fullName: "Lead Inspector",
        email: "inspector@aot.edu.in",
        role: "LEAD_INSPECTOR",
        isReady: true,
      },
    ],
    score: 0,
    createdAt: new Date().toISOString(),
  };
}

function createEnlistedAgency(data: JoinTeamInput): DetectiveAgency {
  return {
    id: `agency-${Date.now()}`,
    name: "Enlisted Agency",
    motto: "Active deduction team",
    passcode: data.passcode,
    leaderId: "lead-inspector",
    members: [
      {
        userId: "lead-inspector",
        fullName: "Lead Inspector",
        email: "lead@aot.edu.in",
        role: "LEAD_INSPECTOR",
        isReady: true,
      },
      {
        userId: "current-user",
        fullName: "Field Operative",
        email: "operative@aot.edu.in",
        role: "FIELD_AGENT",
        isReady: true,
      },
    ],
    score: 0,
    createdAt: new Date().toISOString(),
  };
}

export default function TeamPage() {
  const [myTeam, setMyTeam] = React.useState<DetectiveAgency | null>(null);
  const [copiedPasscode, setCopiedPasscode] = React.useState(false);
  const [tab, setTab] = React.useState<"roster" | "create" | "join">("roster");
  const isLeader = true;

  const createForm = useForm<CreateTeamInput>({
    resolver: zodResolver(createTeamSchema),
  });
  const joinForm = useForm<JoinTeamInput>({
    resolver: zodResolver(joinTeamSchema),
  });

  const handleCreate = (data: CreateTeamInput) => {
    const newAgency = createCharteredAgency(data);
    setMyTeam(newAgency);
    toast.success("Agency Chartered", {
      description: `"${data.name}" is now registered with Scotland Yard.`,
    });
    createForm.reset();
    setTab("roster");
  };

  const handleJoin = (data: JoinTeamInput) => {
    const joinedAgency = createEnlistedAgency(data);
    setMyTeam(joinedAgency);
    toast.success("Enlisted!", {
      description: `Joined agency via passcode ${data.passcode}.`,
    });
    joinForm.reset();
    setTab("roster");
  };

  const handleCopyPasscode = () => {
    if (!myTeam) return;
    navigator.clipboard.writeText(myTeam.passcode).then(() => {
      setCopiedPasscode(true);
      setTimeout(() => setCopiedPasscode(false), 2000);
    });
  };

  const handleKickMember = (userId: string) => {
    setMyTeam((t) =>
      t
        ? {
            ...t,
            members: t.members.filter((m) => m.userId !== userId),
          }
        : null,
    );
    toast.info("Operative dismissed from agency roster.");
  };

  const handleChangeRole = (userId: string, role: TeamRole) => {
    setMyTeam((t) =>
      t
        ? {
            ...t,
            members: t.members.map((m) =>
              m.userId === userId ? { ...m, role } : m,
            ),
          }
        : null,
    );
  };

  const handleToggleReady = (userId: string) => {
    setMyTeam((t) =>
      t
        ? {
            ...t,
            members: t.members.map((m) =>
              m.userId === userId ? { ...m, isReady: !m.isReady } : m,
            ),
          }
        : null,
    );
  };

  const readyCount = myTeam
    ? myTeam.members.filter((m) => m.isReady).length
    : 0;
  const allReady = myTeam ? readyCount === myTeam.members.length : false;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-amber">
            <Users className="h-4 w-4" /> Detective Agency HQ
          </div>
          <h1 className="font-script mt-1 text-3xl leading-tight text-parchment">
            {myTeam ? myTeam.name : "Agency Roster"}
          </h1>
          {myTeam?.motto ? (
            <p className="text-xs italic text-muted-foreground">
              &ldquo;{myTeam.motto}&rdquo;
            </p>
          ) : !myTeam ? (
            <p className="text-xs text-muted-foreground">
              No agency currently chartered or joined.
            </p>
          ) : null}
        </div>
        {myTeam && (
          <div
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
              allReady
                ? "border-amber text-amber"
                : "border-amber/40 text-amber"
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            {allReady
              ? "Agency Ready for Investigation"
              : `${readyCount} / ${myTeam.members.length} ready`}
          </div>
        )}
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-2 border-b border-fog pb-0">
        {(["roster", "create", "join"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`-mb-px border-b-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${
              tab === t
                ? "border-amber text-amber"
                : "border-transparent text-muted-foreground hover:text-parchment"
            }`}
          >
            {t === "roster"
              ? "Agency Roster"
              : t === "create"
                ? "Charter Agency"
                : "Enlist via Code"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {/* ROSTER TAB */}
        {tab === "roster" && (
          <motion.div
            key="roster"
            variants={stagger}
            initial="initial"
            animate="animate"
            className="space-y-4"
          >
            {!myTeam ? (
              <div className="wood-panel rounded-xl p-8 text-center space-y-4">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-amber/40 bg-surface text-amber">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-parchment">
                    No Agency Enlisted
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground max-w-sm mx-auto">
                    You are not currently enrolled in a detective agency.
                    Charter a new agency or enlist using an invitation passcode.
                  </p>
                </div>
                <div className="flex justify-center gap-3 pt-2">
                  <BrassButton size="sm" onClick={() => setTab("create")}>
                    Charter Agency
                  </BrassButton>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setTab("join")}
                  >
                    Enlist via Code
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Passcode Banner */}
                <motion.div
                  variants={fadeUp}
                  className="wood-panel flex items-center justify-between rounded-lg px-5 py-3"
                >
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                      Agency Passcode — share to invite
                    </div>
                    <div className="font-mono text-2xl font-bold tracking-widest text-amber">
                      {myTeam.passcode}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyPasscode}
                    className="flex items-center gap-1.5 rounded border border-fog bg-surface px-3 py-2 text-xs font-semibold text-parchment hover:text-amber transition-colors cursor-pointer"
                  >
                    {copiedPasscode ? (
                      <CheckCircle2 className="h-3.5 w-3.5 text-amber" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                    {copiedPasscode ? "Copied!" : "Copy Code"}
                  </button>
                </motion.div>

                {/* Member Cards */}
                <div className="grid gap-3 sm:grid-cols-2">
                  {myTeam.members.map((member) => (
                    <motion.div
                      key={member.userId}
                      variants={fadeUp}
                      className="wood-panel space-y-3 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`h-2.5 w-2.5 rounded-full ${
                              member.isReady
                                ? "bg-amber shadow-[0_0_6px_rgb(var(--amber-rgb)/0.6)]"
                                : "bg-muted-foreground"
                            }`}
                          />
                          <div>
                            <div className="flex items-center gap-1.5 font-semibold text-parchment">
                              {member.userId === myTeam.leaderId && (
                                <Crown className="h-3.5 w-3.5 text-amber" />
                              )}
                              {member.fullName}
                            </div>
                            <div className="text-[10px] text-muted-foreground">
                              {member.email}
                            </div>
                          </div>
                        </div>
                        {isLeader && member.userId !== myTeam.leaderId && (
                          <button
                            type="button"
                            onClick={() => handleKickMember(member.userId)}
                            className="rounded border border-fog bg-umber p-1 text-muted-foreground transition-colors hover:border-wax hover:text-wax-foreground cursor-pointer"
                            title="Remove from agency"
                          >
                            <UserMinus className="h-3 w-3" />
                          </button>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        {isLeader && member.userId !== myTeam.leaderId ? (
                          <select
                            value={member.role}
                            onChange={(e) =>
                              handleChangeRole(
                                member.userId,
                                e.target.value as TeamRole,
                              )
                            }
                            className="field-control cursor-pointer rounded border border-fog bg-umber px-2 py-1 font-mono text-xs text-parchment focus:border-amber focus:outline-none"
                          >
                            {ROLE_OPTIONS.map((r) => (
                              <option key={r} value={r}>
                                {ROLE_LABELS[r]}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <span className="font-mono text-xs text-amber">
                            {ROLE_LABELS[member.role]}
                          </span>
                        )}

                        <button
                          type="button"
                          onClick={() => handleToggleReady(member.userId)}
                          className={`flex items-center gap-1 rounded border px-2 py-1 text-[10px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                            member.isReady
                              ? "border-amber text-amber hover:bg-wax/20 hover:border-wax hover:text-wax-foreground"
                              : "border-fog text-muted-foreground hover:border-amber/50 hover:text-amber"
                          }`}
                        >
                          <UserCheck className="h-3 w-3" />
                          {member.isReady ? "Ready" : "Not Ready"}
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* CREATE TAB */}
        {tab === "create" && (
          <motion.div
            key="create"
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="wood-panel max-w-lg rounded-xl p-6"
          >
            <h2 className="font-serif text-xl font-bold text-parchment">
              Charter a New Agency
            </h2>
            <p className="mt-1 text-xs text-parchment">
              You will be designated Lead Inspector with full authority over the
              roster.
            </p>
            <form
              onSubmit={createForm.handleSubmit(handleCreate)}
              className="mt-6 space-y-4"
            >
              <div className="space-y-1">
                <Label htmlFor="name">Agency Moniker</Label>
                <Input
                  id="name"
                  {...createForm.register("name")}
                  placeholder="e.g. 221B Enigma Syndicate"
                />
                {createForm.formState.errors.name && (
                  <p className="text-xs text-wax-foreground">
                    {createForm.formState.errors.name.message}
                  </p>
                )}
              </div>
              <div className="space-y-1">
                <Label htmlFor="motto">Motto (Optional)</Label>
                <Input
                  id="motto"
                  {...createForm.register("motto")}
                  placeholder="Data! Data! Data!"
                />
              </div>
              <BrassButton type="submit" size="md" className="w-full">
                Charter Agency
              </BrassButton>
            </form>
          </motion.div>
        )}

        {/* JOIN TAB */}
        {tab === "join" && (
          <motion.div
            key="join"
            variants={fadeUp}
            initial="initial"
            animate="animate"
            className="wood-panel max-w-sm rounded-xl p-6"
          >
            <div className="flex items-center gap-2 text-amber">
              <KeyRound className="h-5 w-5" />
              <h2 className="font-serif text-xl font-bold text-parchment">
                Enlist via Passcode
              </h2>
            </div>
            <p className="mt-1 text-xs text-parchment">
              Enter the 6-character passcode from your Lead Inspector.
            </p>
            <form
              onSubmit={joinForm.handleSubmit(handleJoin)}
              className="mt-6 space-y-4"
            >
              <div className="space-y-1">
                <Label htmlFor="passcode">6-Character Passcode</Label>
                <Input
                  id="passcode"
                  {...joinForm.register("passcode")}
                  maxLength={6}
                  placeholder="e.g. ENG221"
                  className="font-mono text-center text-xl tracking-widest uppercase text-amber"
                  onChange={(e) => {
                    joinForm.setValue("passcode", e.target.value.toUpperCase());
                  }}
                />
                {joinForm.formState.errors.passcode && (
                  <p className="text-xs text-wax-foreground">
                    {joinForm.formState.errors.passcode.message}
                  </p>
                )}
              </div>
              <Button type="submit" variant="outline" className="w-full">
                Enter Agency Roster
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
