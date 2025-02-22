interface IdentityDisplayProps {
  identity: readonly [string, bigint, string, string, string];
  onEdit: () => void;
}

export function IdentityDisplay({ identity, onEdit }: IdentityDisplayProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        gap: "1rem",
      }}
    >
      <h3>Identity</h3>
      <div>Name: {identity[0]}</div>
      <div>
        Birth Date: {new Date(Number(identity[1]) * 1000).toLocaleDateString()}
      </div>
      <div>Introduction: {identity[2]}</div>
      <div>Email: {identity[3]}</div>
      <div>Website: {identity[4]}</div>
      <button onClick={onEdit} style={{ alignSelf: "stretch" }}>
        Edit
      </button>
    </div>
  );
}
