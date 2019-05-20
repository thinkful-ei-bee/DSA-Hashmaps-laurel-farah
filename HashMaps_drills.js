class HashMap {
    constructor(initialCapacity = 8) {
        this.length = 0;
        this._hashTable = [];
        this._capacity = initialCapacity;
        this._deleted = 0;
    }
    get(key) {
        const index = this._findSlot(key);
        if (this._hashTable[index] === undefined) {
            throw new Error('Key error');
        }
        return this._hashTable[index].value;
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

module.exports = HashMap;

function main() {
    let lor = new HashMap();
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
    // console.log(lor._findSlot("Maiar")); //0
    // console.log(lor._findSlot("Hobbit")); //5
    // console.log(lor); //capacity 8
}
main();

const WhatDoesThisDo = function () {
    let str1 = 'Hello World.';
    let str2 = 'Hello World.';
    let map1 = new HashMap();
    map1.set(str1, 10);
    map1.set(str2, 20);
    let map2 = new HashMap();
    let str3 = str1;
    let str4 = str2;
    map2.set(str3, 20);
    map2.set(str4, 10);

    // console.log(map1.get(str1));
    // console.log(map2.get(str3));
}
WhatDoesThisDo();
// map1 will display 20 because the value was overwritten by: map2.set(str3,20);
// map2 will display 10 because the value was overwritten by: map2.set(str4,10);


// Demonstrate understanding of Hash maps: Drill 3

// length m = 11 keys: 10, 22, 31, 4, 15, 28, 17, 88, 59
// we only have 9 values and we need to find the next available slot (open addressing)
// HashMap: [10, 22, 31, _, 4, 15, 28, 17, 88, _, 59]
// function hashMap (num) {
    //return num % hashTable.length;
//}

//  length m = 9 keys: 5, 28, 19, 15, 20, 33, 12, 17, 10

// Remove duplicates
function deleteDuplicates(string) {
    const characters = new HashMap();
    for( let i = string.length - 1; i > 0; i--) {
        characters.set(string[i])
    }
    let results = '';
}