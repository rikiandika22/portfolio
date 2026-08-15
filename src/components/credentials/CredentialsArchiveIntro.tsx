import CredentialsSectionHeader from "./CredentialsSectionHeader";

export default function CredentialsArchiveIntro() {
  return (
    <section
      aria-label="Selected Credentials Archive"
      className="w-full credentials-hero-item"
      style={{
        marginTop: "var(--credential-major-gap)",
      }}
    >
      <CredentialsSectionHeader
        eyebrow="Archive Overview"
        countLabel="09 Verified Documents"
        title="SELECTED CREDENTIALS"
      />
    </section>
  );
}
