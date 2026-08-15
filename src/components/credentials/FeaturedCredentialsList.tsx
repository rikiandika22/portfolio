import { CREDENTIALS } from "@/data/credentials";
import FeaturedCredentialItem from "./FeaturedCredentialItem";

export default function FeaturedCredentialsList() {
  const featuredCredentials = CREDENTIALS.filter((item) => item.featured);

  return (
    <section
      aria-label="Featured Credentials List"
      className="w-full credentials-animate-item"
    >
      <div className="w-full flex flex-col">
        {featuredCredentials.map((credential, index) => (
          <FeaturedCredentialItem
            key={credential.id}
            credential={credential}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
