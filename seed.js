const { Musician, Band } = require("./models/index");
const { db } = require("./db/connection");
const { seedMusician, seedBand } = require("./seedData");

const syncSeed = async () => {
    await db.sync({ force: true });

    // Create bands and store their instances
    const bands = [];
    for (const band of seedBand) {
        const createdBand = await Band.create(band);
        bands.push(createdBand);
    }

    // Create musicians with bandId
    await Musician.create({ ...seedMusician[0], bandId: bands[0].id }); // Lisa -> Black Pink
    await Musician.create({ ...seedMusician[1], bandId: bands[0].id }); // Jennie -> Black Pink
    await Musician.create({ ...seedMusician[2], bandId: bands[1].id }); // Travis Barker -> Blink 182
    await Musician.create({ ...seedMusician[3], bandId: bands[2].id }); // Mick Jagger -> Coldplay
    await Musician.create({ ...seedMusician[4], bandId: bands[2].id }); // Drake -> Coldplay
    await Musician.create({ ...seedMusician[5], bandId: bands[2].id }); // Jimi Hendrix -> Coldplay

    console.log('Seeding completed, verifying bands:', await Band.findAll({ include: [{ model: Musician, as: 'musicians' }] }));
};

syncSeed().catch(err => console.error('Seeding error:', err));