---
config:
  theme: neo-dark
  layout: dagre
---
classDiagram
direction LR
    class Projects {
	    Integer id <<'oid'>>
	    String name
	    String fundingNotice
	    String description
	    Datetime startDate
	    Datetime endDate nullable
	    String status
    }

    class Equipments {
	    Integer id <<'oid'>>
	    String name
    }

    class Borrows {
	    Integer id <<'oid'>>
	    Datetime startDate
	    Datetime endDate nullable
	    Boolean isStillBorrowed
    }

    class Students {
	    Integer id <<'oid'>>
	    String name
	    String email
	    String registration
	    Datetime birthdate
	    Integer term
	    String shift
    }

    class Professors {
	    Integer id <<'oid'>>
	    String name
	    String email
	    String telephone
	    String registration
    }

    class Coordinators {
	    Integer id <<'oid'>>
	    String area
	    Datetime startDate
	    Datetime endDate nullable
    }

    class Researchers {
		Integer id <<'oid'>>
	    String name
	    String function
	    Integer weeklyHours
	    Datetime startDate
	    Datetime endDate nullable
    }

    class Laboratories {
	    Integer id <<'oid'>>
	    String name
	    Boolean storageSpace
	    Integer maxOcupants
	    String description
    }

    class Projects_Categories {
	    Integer id <<'oid'>>
	    String name
	    Boolean comerciallyRelevant
	    String area
	    String description
    }

    class Equipments_Categories {
	    Integer id <<'oid'>>
	    String powerSource
	    Boolean fragile
	    String description
    }

    class Coordinations {
	    Integer id <<'oid'>>
	    String area 
	    String block
	    String description
    }

    class Admninistrators {
	    Integer id <<'oid'>>
	    String email
    }

    Projects "0..*" --> "1" Laboratories
    Equipments "0..*" --> "1" Laboratories
    Equipments "0..*" --> "1" Equipments_Categories
    Equipments "0..*" --> "1" Projects
    Projects "1" <-- "1..*" Coordinators
    Projects "1" <-- "1..*" Researchers
    Projects "0..*" --> "1" Projects_Categories
    Coordinators "0..*" --> "1" Professors
    Professors "0..1" <-- "0..*" Researchers
    Professors "0..*" --> "1" Coordinations
    Students "0..1" <-- "0..*" Researchers
    Borrows "0..*" --> "1" Equipments
    Borrows "0..*" --> "0..1" Professors
    Borrows "0..*" --> "0..1" Students