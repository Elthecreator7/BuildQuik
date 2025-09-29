import React from "react";
import Link from "next/link";
import { CrownIcon } from "lucide-react";
import { formatDuration, intervalToDuration } from "date-fns";
import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";

interface Props {
    points: number;
    msBeforeNextRefresh: number
};

export const Usage = ({ points, msBeforeNextRefresh }: Props) => {
    const { has } = useAuth();
    const hasPlusAccess = has?.({ plan: "plus" })

    return (
        <div className="rounded-t-xl bg-background border border-b-0 p-2.5">
            <div className="flex items-center gap-x-2">
                <div>
                    <p className="text-sm">
                        {points} {hasPlusAccess ? "" : "free"} credits remaining
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Resets in {" "}
                        {formatDuration(
                            intervalToDuration({
                                start: new Date(),
                                end: new Date(Date.now() + msBeforeNextRefresh),
                            }),
                            { format: ["months", "days", "hours"] }
                        )}
                    </p>
                </div>
                {!hasPlusAccess && (
                    <Button
                        asChild
                        size="sm"
                        variant="luscent"
                        className="ml-auto"
                    >
                        <Link href="/pricing">
                            <CrownIcon /> Upgrade
                        </Link>
                    </Button>
                )}
            </div>
        </div>
    )
}