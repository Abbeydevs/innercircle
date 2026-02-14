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
import { Download } from "lucide-react";

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
        "Name",
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
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={exportToCSV}
          disabled={isExporting || data.length === 0}
          className="bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/30 rounded-none backdrop-blur-sm transition-all flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          {isExporting ? "Exporting..." : "Export CSV"}
        </Button>

        <BroadcastModal userCount={data.length} />
      </div>

      <div className="border border-white/10 rounded-lg overflow-hidden backdrop-blur-sm bg-white/2">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-white/10 hover:bg-white/5">
              <TableHead className="text-white/70 font-semibold uppercase text-xs tracking-wider">
                Name
              </TableHead>
              <TableHead className="text-white/70 font-semibold uppercase text-xs tracking-wider">
                Email
              </TableHead>
              <TableHead className="text-white/70 font-semibold uppercase text-xs tracking-wider">
                Phone
              </TableHead>
              <TableHead className="text-white/70 font-semibold uppercase text-xs tracking-wider text-center">
                Attended
              </TableHead>
              <TableHead className="text-white/70 font-semibold uppercase text-xs tracking-wider text-right">
                Joined
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={5}
                  className="text-center py-16 text-white/40"
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center mb-2">
                      <span className="text-2xl">📋</span>
                    </div>
                    <p className="text-base">No one is on the waitlist yet.</p>
                  </div>
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
                  <TableCell className="text-white/80 text-sm">
                    {user.email}
                  </TableCell>
                  <TableCell className="text-white/70 text-sm">
                    {user.phoneNumber}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${
                        user.attendedBefore
                          ? "bg-green-500/10 text-green-400 border border-green-500/20"
                          : "bg-white/5 text-white/60 border border-white/10"
                      }`}
                    >
                      {user.attendedBefore ? "Yes" : "No"}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-white/60 text-sm">
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

      {data.length > 0 && (
        <div className="flex flex-wrap gap-6 pt-4">
          <div className="bg-white/5 border border-white/10 rounded-lg px-6 py-4 backdrop-blur-sm">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
              Total Signups
            </p>
            <p className="text-2xl font-bold text-white">{data.length}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg px-6 py-4 backdrop-blur-sm">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
              Returning
            </p>
            <p className="text-2xl font-bold text-white">
              {data.filter((u) => u.attendedBefore).length}
            </p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-lg px-6 py-4 backdrop-blur-sm">
            <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
              New Members
            </p>
            <p className="text-2xl font-bold text-white">
              {data.filter((u) => !u.attendedBefore).length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
