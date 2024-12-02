const fighters = [
    {
        name: 'Freezer',
        power: 8000
    },
    {
        name: 'Vegeta',
        power: 8500
    },
    {
        name: 'Crilin',
        power: 500
    },
    {
        name: 'Mr Satan',
        power: 50
    },
    {
        name: 'Junior',
        power: 6000
    },
    {
        name: 'Goku',
        power: 9001
    },
    {
        name: 'Tensing',
        power: 450
    },
    {
        name: 'Videl',
        power: 300
    },
    {
        name: 'Bulma',
        power: 20
    },
    {
        name: 'C-18',
        power: 7800
    },
    {
        name: 'Gohan',
        power: 8900
    },
    {
        name: 'Trunks',
        power: 1250
    }
];

const weapons = [
    {
        name: "Ventaglio della Musa",
        power: 15
    },
    {
        name: "Scouter",
        power: 30
    },
    {
        name: "Bastone Roshi",
        power: 60
    },
    {
        name: "Fagioli Magici",
        power: 70
    },
    {
        name: "Katana di Yajirobei",
        power: 85
    },
    {
        name: "Spada del Dragone Azzurro",
        power: 115
    },
    {
        name: "Armatura Saiyan",
        power: 145
    },
    {
        name: "Cannone da braccio",
        power: 170
    },
    {
        name: "Nuvola d'oro",
        power: 200
    },
    {
        name: "Bastone Nyoi",
        power: 220
    },
    {
        name: "Spada Z",
        power: 235
    },
    {
        name: "Orecchini Potara",
        power: 250
    }
];

// MILESTONE 1

// Funzione per scegliere un'arma casualmente e rimuoverla dalla lista
function assignRandomWeapon(fighters, weapons) {
    const fightersWithWeapons = fighters.map(fighter => {
        // Ottieni un indice casuale dalla lista delle armi disponibili
        const randomIndex = Math.floor(Math.random() * weapons.length);
        const chosenWeapon = weapons[randomIndex];

        // Rimuovi l'arma scelta dalla lista
        weapons.splice(randomIndex, 1);

        // Assegna l'arma al combattente e calcola il nuovo livello di potenza
        return {
            ...fighter,
            weapon: chosenWeapon.name,
            totalPower: fighter.power + chosenWeapon.power
        };
    });

    return fightersWithWeapons;
}

// Applica la funzione e mostra il risultato
let fightersWithWeapons = assignRandomWeapon(fighters, weapons);

console.log("Fase 1 - Scelta dell'arma:");
console.log(fightersWithWeapons);


// MILESTONE 2
// Funzione per il calcolo dell'allenamento
function trainFighters(fighters) {
    return fighters.map(fighter => {
        // Genera un moltiplicatore casuale tra 1 e 100
        const multiplier = Math.random() * 99 + 1; // [1, 100]
        const newPower = Math.round(fighter.totalPower * multiplier);

        return {
            ...fighter,
            trainingMultiplier: multiplier.toFixed(0),
            totalPower: newPower
        };
    });
}

// Applica l'allenamento
fightersWithWeapons = trainFighters(fightersWithWeapons);

console.log("Fase 2 - Allenamento:");
console.log(fightersWithWeapons);

// MILESTONE 3
// Funzione per filtrare i qualificati
function qualifyFighters(fighters) {
    return fighters.filter(fighter => fighter.totalPower >= 2000);
}

// Applica la qualificazione
const qualifiedFighters = qualifyFighters(fightersWithWeapons);

console.log("Fase 3 - Qualificazione:");
console.log(qualifiedFighters);


// MILESTONE 4 
// Funzione per assicurarsi che il numero di combattenti sia pari
function ensureEvenFighters(fighters) {
    if (fighters.length % 2 !== 0) {
        fighters.push({
            name: "Robot",
            power: 4000,
            weapon: "Laser Cannon",
            totalPower: 4000,
            trainingMultiplier: "N/A"
        });
    }
    return fighters;
}

// Funzione per simulare i combattimenti
function fight(fighters) {
    const fights = [];
    const winners = [];

    for (let i = 0; i < fighters.length; i += 2) {
        const fighter1 = fighters[i];
        const fighter2 = fighters[i + 1];

        // Determina il vincitore
        const winner =
            fighter1.totalPower >= fighter2.totalPower ? fighter1 : fighter2;

        // Salva lo scontro e il vincitore
        fights.push({
            fight: `${fighter1.name} vs ${fighter2.name}`,
            winner: winner.name,
            details: {
                fighter1: { name: fighter1.name, power: fighter1.totalPower },
                fighter2: { name: fighter2.name, power: fighter2.totalPower },
            },
        });

        winners.push(winner);
    }

    return { fights, winners };
}

// Assicura che ci siano combattenti pari
const evenQualifiedFighters = ensureEvenFighters(qualifiedFighters);

// Simula i combattimenti
const { fights, winners } = fight(evenQualifiedFighters);

console.log("Fase 4 - Combattimenti:");
console.log("Scontri:", fights);
console.log("Vincitori:", winners);


// MILESTONE 5
// Funzione per determinare i primi 3 combattenti
function awardTopFighters(fighters) {
    // Ordina i combattenti in ordine decrescente di potenza
    const sortedFighters = fighters.sort((a, b) => b.totalPower - a.totalPower);
    // Prendi i primi 3
    return sortedFighters.slice(0, 3);
}

// Determina il podio
const podium = awardTopFighters(winners);

console.log("Fase 5 - Premiazione:");
console.log("Podio:");
podium.forEach((fighter, index) => {
    console.log(`Posizione ${index + 1}: ${fighter.name}, Potenza: ${fighter.totalPower}`);
});






// // Funzione per continuare il torneo fino a quando non rimane un solo vincitore
// function continueTournament(fighters) {
//     let round = 1;

//     while (fighters.length > 1) {
//         console.log(`\nFase ${round} - Nuovo Girone di Combattimenti:`);
        
//         // Assicura che il numero di combattenti sia pari
//         fighters = ensureEvenFighters(fighters);

//         // Simula i combattimenti
//         const { fights, winners } = fight(fighters);

//         // Mostra i risultati del girone
//         console.log("Scontri:", fights);
//         console.log("Vincitori:", winners);

//         // Passiamo al prossimo round con i vincitori
//         fighters = winners;

//         round++;
//     }

//     // Il vincitore finale
//     console.log(`\nIl vincitore del torneo è ${fighters[0].name} con potenza ${fighters[0].totalPower}!`);
// }

// // Esegui il torneo completo (compresi i gironi successivi)
// continueTournament(qualifiedFighters);
