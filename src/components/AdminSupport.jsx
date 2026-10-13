import { useEffect, useState } from "react";
import { CheckCircle2, Inbox, Reply, ShieldCheck } from "lucide-react";
import { api } from "../api";

const statuses = ["All", "Open", "Replied", "Resolved"];
const statusClass = { Open: "bg-amber-100 text-amber-800", Replied: "bg-blue-100 text-blue-800", Resolved: "bg-green-100 text-green-800" };

const AdminSupport = () => {
  const [filter, setFilter] = useState("All");
  const [tickets, setTickets] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const query = filter === "All" ? "" : `?status=${encodeURIComponent(filter)}`;
    api(`/admin/support${query}`).then(({ tickets: savedTickets }) => {
      setTickets(savedTickets);
      setSelected((current) => savedTickets.find((ticket) => ticket._id === current?._id) || savedTickets[0] || null);
    }).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false));
  }, [filter]);

  const replaceTicket = (ticket) => {
    setSelected(ticket);
    setTickets((current) => filter !== "All" && ticket.status !== filter ? current.filter((item) => item._id !== ticket._id) : current.map((item) => item._id === ticket._id ? ticket : item));
  };

  const sendReply = async (event) => {
    event.preventDefault();
    setSaving(true); setError(""); setMessage("");
    try {
      const { ticket } = await api(`/admin/support/${selected._id}/reply`, { method: "PATCH", body: JSON.stringify({ reply }) });
      replaceTicket(ticket); setReply(""); setMessage(`Reply saved for ${ticket.reference}.`);
    } catch (requestError) { setError(requestError.message); }
    finally { setSaving(false); }
  };

  const changeStatus = async (status) => {
    setSaving(true); setError(""); setMessage("");
    try {
      const { ticket } = await api(`/admin/support/${selected._id}/status`, { method: "PATCH", body: JSON.stringify({ status }) });
      replaceTicket(ticket); setMessage(`${ticket.reference} marked ${status.toLowerCase()}.`);
    } catch (requestError) { setError(requestError.message); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-8">
      <div><div className="flex items-center gap-2 text-purple-700"><ShieldCheck size={21} /><p className="text-sm font-semibold uppercase tracking-widest">Authorized administrator</p></div><h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Admin Support</h2><p className="mt-3 max-w-3xl text-slate-600">Review farmer requests, send persisted replies, and resolve completed tickets.</p></div>
      {(message || error) && <p className={`rounded-xl px-4 py-3 text-sm ${error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-800"}`}>{error || message}</p>}
      <div className="flex flex-wrap gap-2">{statuses.map((status) => <button type="button" key={status} onClick={() => { setLoading(true); setFilter(status); }} className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === status ? "bg-purple-600 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50"}`}>{status}</button>)}</div>

      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><div className="flex items-center gap-2"><Inbox className="text-purple-600" size={21} /><h3 className="font-bold text-slate-900">Incoming requests</h3></div>{loading ? <p className="mt-5 text-sm text-slate-500">Loading requests...</p> : tickets.length === 0 ? <p className="mt-5 rounded-lg bg-slate-50 p-5 text-sm text-slate-500">No {filter === "All" ? "" : filter.toLowerCase()} requests.</p> : <div className="mt-5 space-y-2">{tickets.map((ticket) => <button type="button" key={ticket._id} onClick={() => { setSelected(ticket); setReply(""); setMessage(""); }} className={`w-full rounded-xl border p-4 text-left transition ${selected?._id === ticket._id ? "border-purple-500 bg-purple-50" : "border-slate-200 hover:bg-slate-50"}`}><div className="flex items-start justify-between gap-3"><strong className="text-sm text-slate-900">{ticket.subject}</strong><span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${statusClass[ticket.status]}`}>{ticket.status}</span></div><p className="mt-2 text-xs text-slate-500">{ticket.reference} · {ticket.farmer?.name}</p><p className="mt-1 text-xs text-slate-500">{new Date(ticket.createdAt).toLocaleString()}</p></button>)}</div>}</section>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          {!selected ? <div className="py-12 text-center text-slate-500">Select a support request to open it.</div> : <>
            <div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-semibold uppercase tracking-wider text-purple-600">{selected.reference}</p><h3 className="mt-1 text-2xl font-bold text-slate-900">{selected.subject}</h3></div><span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClass[selected.status]}`}>{selected.status}</span></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3 text-sm"><div className="rounded-lg bg-slate-50 p-3"><span className="text-xs text-slate-500">Farmer</span><strong className="mt-1 block">{selected.farmer?.name}</strong><span className="text-xs text-slate-500">{selected.farmer?.email}</span></div><div className="rounded-lg bg-slate-50 p-3"><span className="text-xs text-slate-500">Category</span><strong className="mt-1 block">{selected.category}</strong></div><div className="rounded-lg bg-slate-50 p-3"><span className="text-xs text-slate-500">Related field</span><strong className="mt-1 block">{selected.field?.farmName || "General request"}</strong></div></div>
            <div className="mt-5 rounded-xl border border-slate-200 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Farmer message</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{selected.message}</p></div>
            {selected.adminReply && <div className="mt-4 rounded-xl bg-blue-50 p-4"><p className="text-xs font-semibold uppercase tracking-wider text-blue-700">Current admin reply</p><p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-700">{selected.adminReply}</p></div>}
            <form onSubmit={sendReply} className="mt-6"><label className="block text-sm font-medium text-slate-700">Reply<textarea required minLength={2} maxLength={3000} rows={5} value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Write a practical response to the farmer" className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-purple-600" /></label><div className="mt-4 flex flex-wrap gap-3"><button type="submit" disabled={saving} className="flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-purple-700 disabled:opacity-60"><Reply size={16} /> Send Reply</button>{selected.status !== "Resolved" ? <button type="button" disabled={saving} onClick={() => changeStatus("Resolved")} className="flex items-center gap-2 rounded-lg border border-green-600 px-4 py-2.5 text-sm font-semibold text-green-700 hover:bg-green-50"><CheckCircle2 size={16} /> Mark Resolved</button> : <button type="button" disabled={saving} onClick={() => changeStatus("Open")} className="rounded-lg border border-amber-600 px-4 py-2.5 text-sm font-semibold text-amber-700 hover:bg-amber-50">Reopen Ticket</button>}</div></form>
          </>}
        </section>
      </div>
    </div>
  );
};

export default AdminSupport;
