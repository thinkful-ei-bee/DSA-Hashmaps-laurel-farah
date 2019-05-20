class HashMap {
    constructor(initialCapacity = 8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }
    static _hashString(string) {
        let hash = 5381;
        for (let i = 0; i < string.length; i++) {
            hash = (hash << 5) + hash + string.charCodeAt(i);
        }
        return hash >>> 0;
    }
    set(key, value) {
        const loadRatio = (this.length + this._deleted + 1) / this._capacity;
        if (loadRatio > HashMap.MAX_LOAD_RATIO) {
            this._resize(this._capacity * HashMap.SIZE_RATIO);
        }
        //Find the slot where this key should be in
        const index = this._findSlot(key);

        if (!this._hashTable[index]) {
            this.length++;
        }
        this._hashTable[index] = {
            key,
            value,
            DELETED: false
        };
    }
    delete(key) {
        const index = this._findSlot(key);
        const slot = this._hashTable[index];
        if (slot === undefined) {
            throw new Error('Key error');
        }
        slot.DELETED = true;
        this.length--;
        this._deleted++;
    }
    _findSlot(key) {
        const hash = HashMap._hashString(key);
        const start = hash % this._capacity;

        for (let i = start; i < start + this._capacity; i++) {
            const index = i % this._capacity;
            const slot = this._hashTable[index];
            if (slot === undefined || (slot.key === key && !slot.DELETED)) {
                return index;
            }
        }
    }
    _resize(size) {
        const oldSlots = this._slots;
        this._capacity = size;
        // Reset the length - it will get rebuilt as you add the items back
        this.length = 0;
        this._slots = [];

        for (const slot of oldSlots) {
            if (slot !== undefined) {
                this.add(slot.key, slot.value);
            }
        }
    }
}
HashMap.MAX_LOAD_RATIO = 0.5;
HashMap.SIZE_RATIO = 3;

function main() {
    let lor = new HashMap;
    HashMap.MAX_LOAD_RATIO = 0.5;
    lor.SIZE_RATIO = 3;
    lor.set("Hobbit", "Bilbo");
    lor.set("Hobbit", "Frodo");
    lor.set("Wizard", "Gandolf");
    lor.set("Human", "Aragon");
    lor.set("Elf", "Legolas");
    lor.set("Maiar", "The Necromancer");
    lor.set("Maiar", "Sauron");
    lor.set("RingBearer", "Gollum");
    lor.set("LadyOfLight", "Galadriel");
    lor.set("HalfElven", "Arwen");
    lor.set("Ent", "Treebeard");
    lor._findSlot("Hobbit");
    lor._findSlot("Hobbit");
    lor._findSlot("Wizard");
    lor._findSlot("Human");
    lor._findSlot("Elf");
    lor._findSlot("Maiar");
    lor._findSlot("Maiar");
    lor._findSlot("RingBearer");
    lor._findSlot("LadyOfLight");
    lor._findSlot("HalfEleven");
    lor._findSlot("Ent");
    console.log(lor);
}
main();

module.exports = HashMap;