"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BroadcastModal } from "@/components/BroadcastModal";

type WaitlistUser = {
  id: string;
  firstName: string;
  email: string;
  phoneNumber: string;
  attendedBefore: boolean;
  createdAt: Date;
};

export default function WaitlistClient({ data }: { data: WaitlistUser[] }) {
  const [isExporting, setIsExporting] = useState(false);

  const exportToCSV = () => {
    setIsExporting(true);
    try {
      const headers = [
        "First Name",
        "Email",
        "Phone Number",
        "Attended Before",
        "Date Joined",
      ];

      const csvRows = data.map((user) =>
        [
          `"${user.firstName}"`,
          `"${user.email}"`,
          `"${user.phoneNumber}"`,
          user.attendedBefore ? "Yes" : "No",
          `"${new Date(user.createdAt).toLocaleDateString()}"`,
        ].join(","),
      );

      const csvString = [headers.join(","), ...csvRows].join("\n");

      const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `inner-circle-waitlist-${new Date().toISOString().split("T")[0]}.csv`,
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to export CSV", error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-4">
        <Button
          onClick={exportToCSV}
          disabled={isExporting || data.length === 0}
          className="bg-white/10 hover:bg-white/20 text-white rounded-none border border-white/10"
        >
          {isExporting ? "Exporting..." : "Export to CSV"}
        </Button>

        <BroadcastModal userCount={data.length} />
      </div>

      <div className="border border-white/10 rounded-none bg-white/2 overflow-hidden">
        <Table>
          <TableHeader className="bg-white/5 hover:bg-white/5 border-b border-white/10">
            <TableRow>
              <TableHead className="text-white/60">First Name</TableHead>
              <TableHead className="text-white/60">Email</TableHead>
              <TableHead className="text-white/60">Phone</TableHead>
              <TableHead className="text-white/60 text-center">
                Attended Before
              </TableHead>
              <TableHead className="text-white/60 text-right">
                Date Joined
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-white/40"
                >
                  No one is on the waitlist yet.
                </TableCell>
              </TableRow>
            ) : (
              data.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <TableCell className="font-medium text-white">
                    {user.firstName}
                  </TableCell>
                  <TableCell className="text-white/80">{user.email}</TableCell>
                  <TableCell className="text-white/80">
                    {user.phoneNumber}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${user.attendedBefore ? "bg-green-500/10 text-green-400" : "bg-white/10 text-white/60"}`}
                    >
                      {user.attendedBefore ? "Yes" : "No"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-white/60">
                    {new Date(user.createdAt).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
