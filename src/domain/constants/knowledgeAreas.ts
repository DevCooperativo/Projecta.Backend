export const KnowledgeAreas = {
    EXACT_AND_EARTH_SCIENCES: "Ciências Exatas e da Terra",
    BIOLOGICAL_SCIENCES: "Ciências Biológicas",
    ENGINEERING: "Engenharias",
    HEALTH_SCIENCES: "Ciências da Saúde",
    AGRARIAN_SCIENCES: "Ciências Agrárias",
    APPLIED_SOCIAL_SCIENCES: "Ciências Sociais Aplicadas",
    HUMAN_SCIENCES: "Ciências Humanas",
    LINGUISTICS_LETTERS_AND_ARTS: "Linguística, Letras e Artes"
} as const

export type KnowledgeAreasType = typeof KnowledgeAreas[keyof typeof KnowledgeAreas]