import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp, CircleCheck, Clock3, LifeBuoy, MessageSquareReply, Send } from "lucide-react";
import { api } from "../api";

const categories = ["Irrigation advice", "Pump/Electricity", "Field details", "Technical issue", "Other"];
const initialForm = { fieldId: "", category: "Irrigation advice", subject: "", message: "" };
const statusClass = { Open: "bg-amber-100 text-amber-800", Replied: "bg-blue-100 text-blue-800", Resolved: "bg-green-100 text-green-800" };

const SupportCenter = ({ fields }) => {
  const [form, setForm] = useState(initialForm);
  const [tickets, setTickets] = useState([]);
  const [activeTicket, setActiveTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api("/support").then(({ tickets: savedTickets }) => setTickets(savedTickets)).catch((requestError) => setError(requestError.message)).finally(() => setLoading(false));
  }, []);

  const updateForm = ({ target }) => {
    setForm((current) => ({ ...current, [target.name]: target.value }));
    setSuccess("");
    setError("");
  };

  const submitTicket = async (event) => {
    event.preventDefault();
    setSubmitting(true); setSuccess(""); setError("");
    try {
      const payload = { ...form, fieldId: form.fieldId || null };
      const { ticket } = await api("/support", { method: "POST", body: JSON.stringify(payload) });
      setTickets((current) => [ticket, ...current]);
      setActiveTicket(ticket);
      setForm(initialForm);
      setSuccess(`Support request submitted successfully. Ticket reference: ${ticket.reference}`);
    } catch (requestError) { setError(requestError.message); }
    finally { setSubmitting(false); }
  };

  const toggleTicket = async (ticket) => {
    if (activeTicket?._id === ticket._id) { setActiveTicket(null); return; }
    setError("");
    try {
      const response = await api(`/support/${ticket._id}`);
      setActiveTicket(response.ticket);
    } catch (requestError) { setError(requestError.message); }
  };

  return (
    <div className="space-y-8">
      <div><p className="text-sm font-semibold uppercase tracking-widest text-green-600">Farmer assistance</p><h2 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">Support Center</h2><p className="mt-3 max-w-3xl text-slate-600">Send a question to the AgroAI project support team and return here to read the response.</p></div>
      {(success || error) && <p className={`rounded-xl px-4 py-3 text-sm ${error ? "bg-red-50 text-red-700" : "bg-green-50 text-green-800"}`}>{error || success}</p>}

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <form onSubmit={submitTicket} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="flex items-center gap-3"><div className="rounded-xl bg-green-100 p-2.5 text-green-700"><LifeBuoy size={22} /></div><div><h3 className="text-xl font-bold text-slate-900">Submit a support request</h3><p className="text-sm text-slate-500">Responses are saved to your account.</p></div></div>
          <div className="mt-6 space-y-4">
            <label className="block text-sm font-medium text-slate-700">Related field (optional)<select name="fieldId" value={form.fieldId} onChange={updateForm} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5"><option value="">General question — no field</option>{fields.map((field) => <option key={field._id} value={field._id}>{field.farmName}</option>)}</select></label>
            <label className="block text-sm font-medium text-slate-700">Issue category<select name="category" value={form.category} onChange={updateForm} className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5">{categories.map((category) => <option key={category}>{category}</option>)}</select></label>
            <label className="block text-sm font-medium text-slate-700">Subject<input required minLength={3} maxLength={120} name="subject" value={form.subject} onChange={updateForm} placeholder="Short summary of the issue" className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-green-600" /></label>
            <label className="block text-sm font-medium text-slate-700">Message<textarea required minLength={10} maxLength={3000} rows={6} name="message" value={form.message} onChange={updateForm} placeholder="Describe what happened and what help you need" className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-3 py-2.5 outline-none focus:border-green-600" /><span className="mt-1 block text-right text-xs text-slate-400">{form.message.length}/3000</span></label>
          </div>
          <button type="submit" disabled={submitting} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700 disabled:opacity-60"><Send size={17} />{submitting ? "Submitting..." : "Submit Request"}</button>
        </form>

        <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8">
          <div className="flex items-center gap-3"><MessageSquareReply className="text-green-700" size={23} /><div><h3 className="text-xl font-bold text-slate-900">My Support Requests</h3><p className="text-sm text-slate-500">Only requests from your account are shown.</p></div></div>
          {loading ? <p className="mt-6 text-sm text-slate-500">Loading support requests...</p> : tickets.length === 0 ? <div className="mt-6 rounded-xl bg-slate-50 p-6 text-center text-sm text-slate-500">No support requests yet.</div> : (
            <div className="mt-6 space-y-3">
              {tickets.map((ticket) => <article key={ticket._id} className="rounded-xl border border-slate-200">
                <button type="button" onClick={() => toggleTicket(ticket)} className="flex w-full items-start justify-between gap-4 p-4 text-left hover:bg-slate-50"><div><div className="flex flex-wrap items-center gap-2"><strong className="text-slate-900">{ticket.subject}</strong><span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusClass[ticket.status]}`}>{ticket.status}</span></div><p className="mt-1 text-xs text-slate-500">{ticket.reference} · {ticket.category} · {new Date(ticket.createdAt).toLocaleString()}</p></div>{activeTicket?._id === ticket._id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}</button>
                {activeTicket?._id === ticket._id && <div className="border-t border-slate-200 p-4 text-sm"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Related field</p><p className="mt-1 text-slate-700">{activeTicket.field?.farmName || "General request"}</p><p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400">Your message</p><p className="mt-1 whitespace-pre-wrap leading-6 text-slate-700">{activeTicket.message}</p><div className={`mt-4 rounded-lg p-4 ${activeTicket.adminReply ? "bg-blue-50" : "bg-slate-50"}`}><p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{activeTicket.adminReply ? <CircleCheck size={15} className="text-blue-600" /> : <Clock3 size={15} />} Admin response</p><p className="mt-2 whitespace-pre-wrap leading-6 text-slate-700">{activeTicket.adminReply || "No response yet. Your request is waiting for the support administrator."}</p>{activeTicket.repliedAt && <p className="mt-2 text-xs text-slate-500">Replied {new Date(activeTicket.repliedAt).toLocaleString()}</p>}</div></div>}
              </article>)}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default SupportCenter;
