export default function DecisionBadge({ value }: { value: 'Approve' | 'Refer' | 'Decline' }) {
  const map = {
    Approve: 'bg-green-100 text-green-800 border-green-200',
    Refer: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Decline: 'bg-red-100 text-red-800 border-red-200',
  } as const;

  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-sm font-medium ${map[value]}`}>
      {value}
    </span>
  );
}
