export default function StatsCards({ leads }) {

  const total = leads.length;

  const newLeads = leads.filter(
    (lead) => lead.status === "New"
  ).length;

  const contacted = leads.filter(
    (lead) => lead.status === "Contacted"
  ).length;

  const qualified = leads.filter(
    (lead) => lead.status === "Qualified"
  ).length;

  const closed = leads.filter(
    (lead) => lead.status === "Closed"
  ).length;

  const cards = [
    {
      title: "Total Leads",
      value: total,
      color: "bg-blue-500"
    },
    {
      title: "New",
      value: newLeads,
      color: "bg-green-500"
    },
    {
      title: "Contacted",
      value: contacted,
      color: "bg-yellow-500"
    },
    {
      title: "Qualified",
      value: qualified,
      color: "bg-purple-500"
    },
    {
      title: "Closed",
      value: closed,
      color: "bg-red-500"
    }
  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">

      {cards.map((card) => (

        <div

          key={card.title}

          className={`${card.color} text-white rounded-lg p-5 shadow-lg`}

        >

          <h3 className="text-lg font-semibold">

            {card.title}

          </h3>

          <p className="text-3xl font-bold mt-2">

            {card.value}

          </p>

        </div>

      ))}

    </div>

  );

}