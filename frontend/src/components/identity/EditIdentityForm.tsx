import { IdentityForm, IdentityFormData } from "./IdentityForm";

interface EditIdentityFormProps {
  formData: IdentityFormData;
  onFormDataChange: (data: Partial<IdentityFormData>) => void;
  isPending: boolean;
  onUpdate: () => void;
  onCancel: () => void;
}

export function EditIdentityForm({
  formData,
  onFormDataChange,
  isPending,
  onUpdate,
  onCancel,
}: EditIdentityFormProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h3>Edit Identity</h3>
      <IdentityForm
        {...formData}
        onNameChange={(value) => onFormDataChange({ name: value })}
        onBirthDateChange={(value) => onFormDataChange({ birthDate: value })}
        onIntroductionChange={(value) =>
          onFormDataChange({ introduction: value })
        }
        onEmailChange={(value) => onFormDataChange({ email: value })}
        onWebsiteChange={(value) => onFormDataChange({ website: value })}
      />
      <button onClick={onUpdate} disabled={isPending}>
        {isPending ? "Updating..." : "Update"}
      </button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
}
