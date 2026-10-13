import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    quote:
      "AgroAI transformed how we manage water across our 200-acre farm. The automated schedules saved us nearly 40% in water usage during the last harvest alone.",
    author: "Rajesh Patel",
    role: "Sugarcane Farmer",
    location: "Gujarat, India",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 2,
    quote:
      "The historical rainfall indicators and manually entered soil moisture help me review irrigation needs before watering.",
    author: "Sarah Jenkins",
    role: "Orchard Owner",
    location: "California, USA",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150",
  },
  {
    id: 3,
    quote:
      "Setting up the plot and reviewing saved pump-duration guidance took minutes. It’s an intuitive irrigation tool for our cooperative.",
    author: "Anil Kumar",
    role: "Agricultural Cooperative Lead",
    location: "Punjab, India",
    rating: 5,
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150",
  },
];

const Testimonials = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3 mb-4">
          Trusted by Farmers Worldwide
        </h2>
        <p className="text-slate-600 text-lg">
          See how smart irrigation advisory helps growers cut costs, save water, and improve overall crop yield.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-8 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-4 text-amber-400">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-slate-700 leading-relaxed italic mb-6">
                "{item.quote}"
              </p>
            </div>

            {/* Author details */}
            <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
              <img
                src={item.avatar}
                alt={item.author}
                className="w-12 h-12 rounded-full object-cover border border-emerald-200"
              />
              <div>
                <h3 className="font-bold text-slate-900 text-base">{item.author}</h3>
                <p className="text-xs font-medium text-slate-500">
                  {item.role} • <span className="text-emerald-600">{item.location}</span>
                </p>
              </div>
            </div>

            <Quote className="absolute top-6 right-6 w-8 h-8 text-slate-200/60 pointer-events-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
