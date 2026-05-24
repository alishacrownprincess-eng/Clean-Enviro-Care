export interface Service {
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  image: string;
  benefits: string[];
  process: { step: string; desc: string }[];
  icon: string;
}

export const services: Service[] = [
  {
    slug: "drain-block-removal",
    title: "Drain Block Removal",
    shortDesc: "Professional removal of stubborn drain blockages using advanced hydro-jetting technology.",
    fullDesc: "Our expert drain block removal service tackles even the most stubborn blockages using state-of-the-art hydro-jetting equipment and CCTV inspection. We diagnose the root cause of every blockage and provide a long-lasting solution — not just a temporary fix. From household sinks to major commercial drainage networks, our certified technicians resolve every blockage safely and efficiently.",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&auto=format&fit=crop&q=80",
    benefits: [
      "CCTV drain inspection for accurate diagnosis",
      "High-pressure hydro-jetting technology",
      "Chemical-free eco-friendly options available",
      "Same-day emergency service",
      "Full clean-up after work completion",
      "12-month workmanship guarantee",
    ],
    process: [
      { step: "Inspection", desc: "We perform a CCTV camera inspection to locate the blockage and assess severity." },
      { step: "Assessment", desc: "Our technician reviews findings and recommends the best removal method." },
      { step: "Removal", desc: "Using hydro-jetting or mechanical augers, we clear the blockage completely." },
      { step: "Verification", desc: "A post-clearance camera check confirms the drain is fully clear and flowing." },
    ],
    icon: "Droplets",
  },
  {
    slug: "kitchen-hood-cleaning",
    title: "Kitchen Hood Cleaning",
    shortDesc: "Deep cleaning of commercial kitchen exhaust hoods, filters, and ductwork to prevent fire hazards.",
    fullDesc: "Commercial kitchen exhaust systems accumulate grease at an alarming rate, creating serious fire hazards and health code violations. Our certified kitchen hood cleaning team uses industrial degreasers and specialized equipment to remove every trace of grease from hoods, filters, fans, and ductwork — restoring your kitchen to full safety compliance and peak efficiency.",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&auto=format&fit=crop&q=80",
    benefits: [
      "Full compliance with UAE fire safety regulations",
      "Industrial-grade degreasing agents",
      "Hood, filter, fan, and duct cleaning",
      "Detailed cleaning report provided",
      "Reduces fire risk significantly",
      "Improves ventilation efficiency",
    ],
    process: [
      { step: "Protection", desc: "We cover all cooking surfaces and equipment before beginning work." },
      { step: "Degreasing", desc: "Industrial degreasers are applied to hood, filters, and ductwork surfaces." },
      { step: "Scrubbing", desc: "Hand scrubbing removes all residual grease from every surface and corner." },
      { step: "Rinse & Report", desc: "Surfaces are rinsed clean and a full compliance report is issued." },
    ],
    icon: "ChefHat",
  },
  {
    slug: "community-sewage-line",
    title: "Community Sewage Line Cleaning",
    shortDesc: "Comprehensive cleaning and maintenance of community sewage infrastructure systems.",
    fullDesc: "Community sewage systems serve hundreds or thousands of residents and require specialist maintenance to prevent backups, odours, and infrastructure damage. Our team deploys high-capacity vacuum tankers, jetting trucks, and inspection cameras to maintain community sewage lines at peak performance — protecting public health and property values.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&auto=format&fit=crop&q=80",
    benefits: [
      "Large-capacity vacuum tanker fleet",
      "Serving master communities and developments",
      "Preventive maintenance programmes",
      "Emergency response capability",
      "Minimal disruption to residents",
      "Full environmental compliance",
    ],
    process: [
      { step: "Survey", desc: "Full CCTV survey of the sewage network to map condition and problem areas." },
      { step: "Planning", desc: "A maintenance schedule is designed to minimise resident disruption." },
      { step: "Cleaning", desc: "High-pressure jetting and vacuuming clears the entire sewage network." },
      { step: "Reporting", desc: "Comprehensive report with photos and recommendations for future maintenance." },
    ],
    icon: "Building2",
  },
  {
    slug: "big-drainage-system-cleaning",
    title: "Big Drainage System Cleaning",
    shortDesc: "Large-scale drainage system cleaning for commercial and residential complexes.",
    fullDesc: "Large drainage systems in commercial complexes, industrial facilities, and residential towers require specialist equipment and expertise. Our team operates some of the most powerful jetting and vacuum equipment in the UAE, capable of clearing and cleaning drainage networks of any scale — from shopping malls to industrial parks to large residential communities.",
    image: "https://images.unsplash.com/photo-1558618047-f4e90f6a53db?w=1200&auto=format&fit=crop&q=80",
    benefits: [
      "Equipment rated for large-diameter pipes",
      "Minimal disruption to operations",
      "Preventive and reactive services",
      "Licensed and insured operations",
      "Advanced CCTV inspection included",
      "Post-cleaning flow verification",
    ],
    process: [
      { step: "Site Assessment", desc: "Engineers assess the drainage system and plan the safest, most efficient approach." },
      { step: "Mobilisation", desc: "Heavy-duty jetting trucks and vacuum tankers are deployed to site." },
      { step: "Systematic Cleaning", desc: "The entire network is cleaned methodically, section by section." },
      { step: "Final Inspection", desc: "CCTV camera confirms full clearance and a handover report is provided." },
    ],
    icon: "Waves",
  },
  {
    slug: "waste-water-removal",
    title: "Waste Water Removal",
    shortDesc: "Safe and efficient removal of waste water from flooded areas, basements, and industrial sites.",
    fullDesc: "Flooding and waste water accumulation can cause rapid structural damage and dangerous health hazards. Our rapid-response waste water removal team is on call 24/7, arriving with high-capacity pumps and vacuum tankers to extract standing water quickly and safely. We also sanitise affected areas to prevent mould, bacteria, and odour after extraction.",
    image: "https://images.unsplash.com/photo-1563906267088-b029e7101114?w=1200&auto=format&fit=crop&q=80",
    benefits: [
      "24/7 emergency flooding response",
      "High-capacity extraction pumps",
      "Post-extraction sanitisation",
      "Mould and bacteria prevention",
      "Safe waste disposal in compliance with UAE law",
      "Insurance documentation available",
    ],
    process: [
      { step: "Emergency Dispatch", desc: "Our team is dispatched immediately upon your call — 24 hours a day." },
      { step: "Extraction", desc: "High-capacity pumps and vacuum tankers remove all standing water rapidly." },
      { step: "Sanitisation", desc: "Affected areas are treated with industrial sanitisers to prevent bacterial growth." },
      { step: "Drying Support", desc: "We advise on and assist with drying to prevent long-term mould damage." },
    ],
    icon: "Trash2",
  },
  {
    slug: "sump-pit-tank-cleaning",
    title: "Sump Pit Tank Cleaning",
    shortDesc: "Thorough cleaning and maintenance of sump pits to ensure optimal performance.",
    fullDesc: "Sump pits are critical to building drainage systems but are often neglected until they fail. A clogged or damaged sump pit can flood basements and damage foundations. Our sump pit cleaning service thoroughly removes accumulated sludge, debris, and sediment, inspects the pump system, and ensures your sump pit is ready to perform when it matters most.",
    image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=1200&auto=format&fit=crop&q=80",
    benefits: [
      "Complete sludge and sediment removal",
      "Pump inspection and testing",
      "Odour elimination treatment",
      "Structural integrity check",
      "Preventive maintenance scheduling",
      "Emergency same-day service",
    ],
    process: [
      { step: "Access & Safety", desc: "Confined space safety protocols are followed and access is established." },
      { step: "Pumping Out", desc: "All liquid waste is pumped out using our vacuum tankers." },
      { step: "Sludge Removal", desc: "Remaining sludge and solid debris is manually removed and disposed of." },
      { step: "Clean & Inspect", desc: "The pit is cleaned, inspected, and the pump system is tested for correct operation." },
    ],
    icon: "Container",
  },
  {
    slug: "warehouse-deep-cleaning",
    title: "Warehouse Deep Cleaning",
    shortDesc: "Comprehensive deep cleaning services for warehouses, factories, and large industrial spaces.",
    fullDesc: "Industrial spaces accumulate dust, grease, chemical residues, and biological contaminants that standard cleaning cannot address. Our warehouse deep cleaning teams use industrial-grade pressure washers, vacuums, and specialist cleaning agents to restore large facilities to a safe, hygienic standard — improving air quality, worker safety, and regulatory compliance.",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&auto=format&fit=crop&q=80",
    benefits: [
      "Industrial-grade cleaning equipment",
      "Chemical and bio-hazard safe cleaning",
      "Racking, floors, walls, and ceilings",
      "Food-safe certified cleaning agents",
      "Scheduled regular maintenance plans",
      "Minimal operational downtime",
    ],
    process: [
      { step: "Pre-Clean Plan", desc: "We assess the facility and create a systematic cleaning plan to minimise disruption." },
      { step: "Heavy Degreasing", desc: "Industrial degreasers are applied to all surfaces including floors, walls, and equipment." },
      { step: "Pressure Washing", desc: "High-pressure washing removes all loosened debris and cleaning agents." },
      { step: "Final Sanitise", desc: "Industrial sanitisers are applied and the facility is inspected before sign-off." },
    ],
    icon: "Warehouse",
  },
  {
    slug: "sewage-tank-cleaning",
    title: "Sewage Tank Cleaning",
    shortDesc: "Professional sewage tank cleaning with state-of-the-art vacuum tanker trucks.",
    fullDesc: "Sewage tanks require regular desludging and cleaning to function correctly and prevent overflow, blockage, and environmental contamination. Our fleet of high-capacity vacuum tankers and certified confined-space technicians safely extract all sewage waste, clean tank walls, inspect for structural damage, and ensure your system is compliant with UAE environmental regulations.",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1200&auto=format&fit=crop&q=80",
    benefits: [
      "High-capacity vacuum tanker fleet",
      "Confined space certified technicians",
      "Full environmental compliance",
      "Tank wall cleaning and inspection",
      "Odour control treatment",
      "Waste disposal certificates provided",
    ],
    process: [
      { step: "Safety Setup", desc: "Gas testing and confined space safety equipment is established before entry." },
      { step: "Desludging", desc: "Vacuum tankers extract all liquid waste and thick sludge from the tank." },
      { step: "Wall Cleaning", desc: "Tank interior walls are pressure-washed to remove all solid deposits." },
      { step: "Inspection & Cert", desc: "The tank is inspected, sanitised, and a compliance certificate issued." },
    ],
    icon: "FlaskConical",
  },
  {
    slug: "drain-line-jetting",
    title: "Drain Line Jetting",
    shortDesc: "High-pressure water jetting to clear and clean drain lines of all deposits and obstructions.",
    fullDesc: "High-pressure water jetting is the most effective method for clearing and cleaning drain lines. Our jetting equipment operates at up to 4,000 PSI, cutting through grease, tree roots, mineral scale, and compacted debris with ease. Unlike chemical treatments, jetting physically removes the obstruction and leaves pipe walls clean — dramatically reducing the risk of future blockages.",
    image: "https://images.unsplash.com/photo-1558618047-f4e90f6a53db?w=1200&auto=format&fit=crop&q=80",
    benefits: [
      "Up to 4,000 PSI water pressure",
      "Removes roots, grease, and scale",
      "Pipe walls left completely clean",
      "No chemicals required",
      "Suitable for all pipe materials",
      "Prevents future blockages",
    ],
    process: [
      { step: "Camera Check", desc: "CCTV inspection locates blockages and checks pipe condition before jetting." },
      { step: "Nozzle Selection", desc: "The correct jetting nozzle is selected for the pipe size and obstruction type." },
      { step: "High-Pressure Jetting", desc: "Powerful water jets clear and scour the pipe walls completely clean." },
      { step: "Post-Jet Camera", desc: "Final CCTV inspection confirms the drain is completely clear." },
    ],
    icon: "Zap",
  },
  {
    slug: "drain-pipes-blockage-removal",
    title: "Drain Pipes Blockage Removal",
    shortDesc: "Expert removal of blockages from drain pipes using advanced diagnostic and clearing equipment.",
    fullDesc: "Blocked drain pipes cause flooding, foul smells, and structural damage if left untreated. Our specialist team uses a combination of CCTV diagnosis, electro-mechanical clearing, and hydro-jetting to remove blockages from drain pipes of all sizes and materials. We identify and fix root causes to deliver a lasting solution, not just a temporary fix.",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=1200&auto=format&fit=crop&q=80",
    benefits: [
      "Multi-method blockage removal",
      "CCTV diagnosis for accurate targeting",
      "Works on all pipe types and sizes",
      "Root cause identification",
      "Long-term solution guaranteed",
      "24/7 emergency availability",
    ],
    process: [
      { step: "Diagnosis", desc: "CCTV camera inspection identifies the exact location and cause of the blockage." },
      { step: "Method Selection", desc: "The best clearing method (jetting, auger, or rod) is selected for the blockage type." },
      { step: "Clearance", desc: "The blockage is fully removed using the chosen technique." },
      { step: "Root Cause Fix", desc: "We address the underlying cause and advise on preventing recurrence." },
    ],
    icon: "Pipette",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
