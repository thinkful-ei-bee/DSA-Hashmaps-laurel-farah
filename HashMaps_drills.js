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
HashMap.MAX_LOAD_RATIO = 1;
HashMap.SIZE_RATIO = 3;

module.exports = HashMap;

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
// 3. What does this do
WhatDoesThisDo();
// map1 will display 20 because the value was overwritten by: map2.set(str3,20);
// map2 will display 10 because the value was overwritten by: map2.set(str4,10);


// 4. Demonstrate understanding of Hash maps: Drill 3

// length m = 11 keys: 10, 22, 31, 4, 15, 28, 17, 88, 59
// we only have 9 values and we need to find the next available slot (open addressing)
// HashMap: [10, 22, 31, _, 4, 15, 28, 17, 88, _, 59]
// function hashMap (num) {
    //return num % hashTable.length;
//}

//  length m = 9 keys: 5, 28, 19, 15, 20, 33, 12, 17, 10


// 4. Remove duplicates
function deleteDuplicates(string) {
    const characters = new HashMap();
    for( let i = string.length - 1; i >= 0; i--) {
        characters.set(string[i], i);
    }
    let results = '';

    for (let i = 0; i < string.length; i++) {
        if ( i === characters.get(string[i])){
            results += string[i];
        }
    }

    return results;
}

// 5. Any permutation a palindrome 
function isItPalindrome(string) {
    let oddChar = false;
    let hm = new Map(); //JS built in HashMap
    let value;
    for (let i = 0; i < string.length; i++) {
        if (hm.has(string[i])) {
            let value = hm.get(string[i]);
            hm.set(string[i], (value + 1));
        }
        else {
            hm.set(string[i], 1);
        }
    }
    const iterator = hm.values(); //just getting the values
    if (Math.floor(iterator.next().value) % 2 !== 0) {
        oddChar = true;
    }
    if (oddChar) return false;
    return true;
}

//here is another version
const palindromic = (word) => {
    const unpaired = new Map();
    for (let character of word) {
        if (unpaired.has(character)) {
            unpaired.delete(character);
        } else {
            unpaired.set(character, true);
        }
    }
    return unpaired.size <= 1;
}

function mainPalindromString() {
    //console.log(PermutationString('madam'));
    console.log(PermutationString('cllic'));
    //console.log(PermutationString('aaxxis'));
    //console.log(PermutationString('caabl'));
}

mainPalindromString();

function main() {
    let lor = new HashMap();
    // lor.set("Hobbit", "Bilbo");
    // lor.set("Hobbit", "Frodo");
    // lor.set("Wizard", "Gandolf");
    // lor.set("Human", "Aragon");
    // lor.set("Elf", "Legolas");
    // lor.set("Maiar", "The Necromancer");
    // lor.set("Maiar", "Sauron");
    // lor.set("RingBearer", "Gollum");
    // lor.set("LadyOfLight", "Galadriel");
    // lor.set("HalfElven", "Arwen");
    // lor.set("Ent", "Treebeard");
    // console.log(lor._findSlot("Maiar")); //0
    // console.log(lor._findSlot("Hobbit")); //5
    // console.log(lor); //capacity 8

    console.log(deleteDuplicates("google"))
}
main();

function _sortword(word) {
    //Helper function: sort a word into some form of canonical order.
    //The exact order is insignificant and need not be lexicographical,
    //as long as it is utterly consistent: any two anagrams of the same
    //letter sequence must return the same string.
    return word.split('').sort().join('')
}
function group_into_anagrams(words) {
    let anagrams = new Map(), ret = [];
    for (let word of words) {
        let key = _sortword(word); //east 
        if (anagrams.has(key)) {
            anagrams.get(key).push(word);
        }
        else {
            ret.push(anagrams.set(key, [word]));
        }
    }
    return ret;
}

//You can use Map() class

const sort = (word) => word.split('').sort().join('');

const anagrams = (words) => {
    const groups = new Map();
    words.forEach(word => {
        const sorted = sort(word);
        const group = groups.get(sorted) || [];
        groups.set(sorted, [...group, word]);
    })
    return Array.from(groups.values());
};

console.log(anagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));
/* should output:
[ [ 'east', 'teas', 'eats' ],
  [ 'cars', 'arcs' ],
  [ 'acre', 'race' ] ]
*/