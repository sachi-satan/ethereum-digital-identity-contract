import { IdentityForm, IdentityFormData } from "./IdentityForm";

interface RegisterIdentityFormProps {
  formData: IdentityFormData;
  onFormDataChange: (data: Partial<IdentityFormData>) => void;
  isPending: boolean;
  onRegister: () => void;
}

export function RegisterIdentityForm({
  formData,
  onFormDataChange,
  isPending,
  onRegister,
}: RegisterIdentityFormProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h3>Register Identity</h3>
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
      <button onClick={onRegister} disabled={isPending}>
        {isPending ? "Registering..." : "Register"}
      </button>
    </div>
  );
}
