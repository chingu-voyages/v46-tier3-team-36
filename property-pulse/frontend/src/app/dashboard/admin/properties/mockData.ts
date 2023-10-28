
type Tenant = {
  id: number;
  name: string;
};

type Unit = {
  id: number;
  name: string;
  description: string;
  rent: number;
  tenants: Tenant[];
};

type Owner = {
  id: number;
  name: string;
};

type Property = {
  id: number;
  name: string;
  description: string;
  owner: Owner;
  units: Unit[];
};

export const mockProperties: Property[] = [
  {
    id: 1,
    name: "Green Ring Apartments",
    description: "Located in a bustling city area with a relaxing garden view.",
    owner: {
      id: 1,
      name: "John Doe"
    },
    units: [
      {
        id: 1,
        name: "Unit 1",
        description: "2BHK",
        rent: 1200,
        tenants: [{ id: 1, name: "Alice P Liddell" }, { id: 2, name: "Bob Rob" }]
      },
      {
        id: 2,
        name: "Unit 2",
        description: "3BHK",
        rent: 1400,
        tenants: [{ id: 3, name: "Charlie Chaplin" }, { id: 4, name: "Daniela Morgen" }]
      }
    ]
  },
  {
    id: 2,
    name: "Skyline Apartments",
    description: "Opulent apartments showcasing a breathtaking city skyline. Equipped with a modern gym.",
    owner: {
      id: 2,
      name: "Jane Smith"
    },
    units: [
      {
        id: 3,
        name: "Unit A",
        description: "1BHK",
        rent: 1000,
        tenants: [{ id: 5, name: "Eve Marry" }, { id: 6, name: "Frank Drunk" }]
      },
      {
        id: 4,
        name: "Unit B",
        description: "Studio",
        rent: 2500,
        tenants: [{ id: 7, name: "Grace Peace" }, { id: 8, name: "Hank Thank" }]
      }
    ]
  },
  {
    id: 3,
    name: "Ocean View Residencies",
    description: "Premium ocean-view apartments. Steps away from the Oceaniarium and shopping mall.",
    owner: {
      id: 3,
      name: "Elena Smith"
    },
    units: [
      {
        id: 5,
        name: "Unit 5",
        description: "Penthouse Suite",
        rent: 3200,
        tenants: [{ id: 9, name: "Eva Maria Santa Luisa Marissa" }, { id: 10, name: "Chris Riss" }]
      },
      {
        id: 6,
        name: "Unit 6",
        description: "2BHK",
        rent: 1900,
        tenants: [{ id: 11, name: "Finn Linn" }, { id: 12, name: "Oliver Malover" }]
      }
    ]
  },
  {
    id: 4,
    name: "Serene Villas",
    description: "A quiet, peaceful setting away from city bustle. Ideal for those seeking tranquility.",
    owner: {
      id: 4,
      name: "Isaac Oldtown"
    },
    units: [
      {
        id: 7,
        name: "Unit A",
        description: "1BHK",
        rent: 900,
        tenants: [{ id: 13, name: "Gail Storm" }]
      },
      {
        id: 8,
        name: "Unit B",
        description: "Studio",
        rent: 800,
        tenants: [{ id: 14, name: "Julie Newmar" }]
      },
      {
        id: 9,
        name: "Unit C",
        description: "2BHK",
        rent: 1300,
        tenants: [{ id: 15, name: "Kurt Wall" }]
      },
      {
        id: 10,
        name: "Unit D",
        description: "1BHK - Female Only",
        rent: 550,
        tenants: [{ id: 16, name: "Lana Vos" }]
      }
    ]
  },
  {
    id: 5,
    name: "Sunset Condos",
    description: "Single unit condos with mesmerizing sunset views. Close to the beach.",
    owner: {
      id: 5,
      name: "Marie Apple"
    },
    units: [
      {
        id: 11,
        name: "Unit 1",
        description: "2BHK",
        rent: 800,
        tenants: [{ id: 17, name: "Neil Stone" }]
      },
      {
        id: 12,
        name: "Unit 2",
        description: "2BHK",
        rent: 800,
        tenants: [{ id: 17, name: "Sonya Donna" }]
      },
      {
        id: 13,
        name: "Unit 3",
        description: "2BHK",
        rent: 800,
        tenants: [{ id: 17, name: "Nick Flick" }]
      }
    ]
  }
];