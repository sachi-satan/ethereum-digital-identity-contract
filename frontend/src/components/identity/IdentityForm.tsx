export interface IdentityFormData {
  name: string;
  birthDate: string;
  introduction: string;
  email: string;
  website: string;
}

export interface IdentityFormProps extends IdentityFormData {
  onNameChange: (value: string) => void;
  onBirthDateChange: (value: string) => void;
  onIntroductionChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onWebsiteChange: (value: string) => void;
}

export function IdentityForm({
  name,
  birthDate,
  introduction,
  email,
  website,
  onNameChange,
  onBirthDateChange,
  onIntroductionChange,
  onEmailChange,
  onWebsiteChange,
}: IdentityFormProps) {
  return (
    <>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <input
        type="date"
        placeholder="Birth Date"
        value={birthDate}
        onChange={(e) => onBirthDateChange(e.target.value)}
      />
      <textarea
        placeholder="Introduction"
        value={introduction}
        onChange={(e) => onIntroductionChange(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />
      <input
        type="url"
        placeholder="Website"
        value={website}
        onChange={(e) => onWebsiteChange(e.target.value)}
      />
    </>
  );
}
