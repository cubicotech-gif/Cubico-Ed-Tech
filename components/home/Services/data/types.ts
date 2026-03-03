export interface ServiceCard {
  id: string;
  number: string;
  category: string;
  symptom: {
    headline: string;
    detail: string;
  };
  cure: {
    name: string;
    outcome: string;
    proofStat: string;
    proofLabel: string;
    defaultBullets: string[];
  };
  expander: {
    forPrincipal: string[];
    forIT: string[];
    forTrustee: {
      stat: string;
      label: string;
      bullets: string[];
    };
    deliveryDays: number;
  };
  tags: string[];
}
