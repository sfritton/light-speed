function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequired11a"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequired11a"] = parcelRequire;
}
parcelRequire.register("bibMu", function(module, exports) {
// A port of an algorithm by Johannes Baagøe <baagoe@baagoe.com>, 2010
// http://baagoe.com/en/RandomMusings/javascript/
// https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
// Original work is under MIT license -
// Copyright (C) 2010 by Johannes Baagøe <baagoe@baagoe.org>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
(function(global, module1, define1) {
    function Alea(seed) {
        var me = this, mash = Mash();
        me.next = function() {
            var t = 2091639 * me.s0 + me.c * 2.3283064365386963e-10; // 2^-32
            me.s0 = me.s1;
            me.s1 = me.s2;
            return me.s2 = t - (me.c = t | 0);
        };
        // Apply the seeding algorithm from Baagoe.
        me.c = 1;
        me.s0 = mash(" ");
        me.s1 = mash(" ");
        me.s2 = mash(" ");
        me.s0 -= mash(seed);
        if (me.s0 < 0) me.s0 += 1;
        me.s1 -= mash(seed);
        if (me.s1 < 0) me.s1 += 1;
        me.s2 -= mash(seed);
        if (me.s2 < 0) me.s2 += 1;
        mash = null;
    }
    function copy(f, t) {
        t.c = f.c;
        t.s0 = f.s0;
        t.s1 = f.s1;
        t.s2 = f.s2;
        return t;
    }
    function impl(seed, opts) {
        var xg = new Alea(seed), state = opts && opts.state, prng = xg.next;
        prng.int32 = function() {
            return xg.next() * 0x100000000 | 0;
        };
        prng.double = function() {
            return prng() + (prng() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
        };
        prng.quick = prng;
        if (state) {
            if (typeof state == "object") copy(state, xg);
            prng.state = function() {
                return copy(xg, {});
            };
        }
        return prng;
    }
    function Mash() {
        var n = 0xefc8249d;
        var mash = function(data) {
            data = String(data);
            for(var i = 0; i < data.length; i++){
                n += data.charCodeAt(i);
                var h = 0.02519603282416938 * n;
                n = h >>> 0;
                h -= n;
                h *= n;
                n = h >>> 0;
                h -= n;
                n += h * 0x100000000; // 2^32
            }
            return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
        };
        return mash;
    }
    if (module1 && module1.exports) module1.exports = impl;
    else if (define1 && define1.amd) define1(function() {
        return impl;
    });
    else this.alea = impl;
})(this, module, typeof define == "function" && define // present with an AMD loader
);

});

parcelRequire.register("5CmGf", function(module, exports) {
// A Javascript implementaion of the "xor128" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper
(function(global, module1, define1) {
    function XorGen(seed) {
        var me = this, strseed = "";
        me.x = 0;
        me.y = 0;
        me.z = 0;
        me.w = 0;
        // Set up generator function.
        me.next = function() {
            var t = me.x ^ me.x << 11;
            me.x = me.y;
            me.y = me.z;
            me.z = me.w;
            return me.w ^= me.w >>> 19 ^ t ^ t >>> 8;
        };
        if (seed === (seed | 0)) // Integer seed.
        me.x = seed;
        else // String seed.
        strseed += seed;
        // Mix in string seed, then discard an initial batch of 64 values.
        for(var k = 0; k < strseed.length + 64; k++){
            me.x ^= strseed.charCodeAt(k) | 0;
            me.next();
        }
    }
    function copy(f, t) {
        t.x = f.x;
        t.y = f.y;
        t.z = f.z;
        t.w = f.w;
        return t;
    }
    function impl(seed, opts) {
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
            return (xg.next() >>> 0) / 0x100000000;
        };
        prng.double = function() {
            do var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 0x100000000, result = (top + bot) / 2097152;
            while (result === 0);
            return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
            if (typeof state == "object") copy(state, xg);
            prng.state = function() {
                return copy(xg, {});
            };
        }
        return prng;
    }
    if (module1 && module1.exports) module1.exports = impl;
    else if (define1 && define1.amd) define1(function() {
        return impl;
    });
    else this.xor128 = impl;
})(this, module, typeof define == "function" && define // present with an AMD loader
);

});

parcelRequire.register("bt3an", function(module, exports) {
// A Javascript implementaion of the "xorwow" prng algorithm by
// George Marsaglia.  See http://www.jstatsoft.org/v08/i14/paper
(function(global, module1, define1) {
    function XorGen(seed) {
        var me = this, strseed = "";
        // Set up generator function.
        me.next = function() {
            var t = me.x ^ me.x >>> 2;
            me.x = me.y;
            me.y = me.z;
            me.z = me.w;
            me.w = me.v;
            return (me.d = me.d + 362437 | 0) + (me.v = me.v ^ me.v << 4 ^ (t ^ t << 1)) | 0;
        };
        me.x = 0;
        me.y = 0;
        me.z = 0;
        me.w = 0;
        me.v = 0;
        if (seed === (seed | 0)) // Integer seed.
        me.x = seed;
        else // String seed.
        strseed += seed;
        // Mix in string seed, then discard an initial batch of 64 values.
        for(var k = 0; k < strseed.length + 64; k++){
            me.x ^= strseed.charCodeAt(k) | 0;
            if (k == strseed.length) me.d = me.x << 10 ^ me.x >>> 4;
            me.next();
        }
    }
    function copy(f, t) {
        t.x = f.x;
        t.y = f.y;
        t.z = f.z;
        t.w = f.w;
        t.v = f.v;
        t.d = f.d;
        return t;
    }
    function impl(seed, opts) {
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
            return (xg.next() >>> 0) / 0x100000000;
        };
        prng.double = function() {
            do var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 0x100000000, result = (top + bot) / 2097152;
            while (result === 0);
            return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
            if (typeof state == "object") copy(state, xg);
            prng.state = function() {
                return copy(xg, {});
            };
        }
        return prng;
    }
    if (module1 && module1.exports) module1.exports = impl;
    else if (define1 && define1.amd) define1(function() {
        return impl;
    });
    else this.xorwow = impl;
})(this, module, typeof define == "function" && define // present with an AMD loader
);

});

parcelRequire.register("dAg3S", function(module, exports) {
// A Javascript implementaion of the "xorshift7" algorithm by
// François Panneton and Pierre L'ecuyer:
// "On the Xorgshift Random Number Generators"
// http://saluc.engr.uconn.edu/refs/crypto/rng/panneton05onthexorshift.pdf
(function(global, module1, define1) {
    function XorGen(seed) {
        var me = this;
        // Set up generator function.
        me.next = function() {
            // Update xor generator.
            var X = me.x, i = me.i, t, v, w;
            t = X[i];
            t ^= t >>> 7;
            v = t ^ t << 24;
            t = X[i + 1 & 7];
            v ^= t ^ t >>> 10;
            t = X[i + 3 & 7];
            v ^= t ^ t >>> 3;
            t = X[i + 4 & 7];
            v ^= t ^ t << 7;
            t = X[i + 7 & 7];
            t = t ^ t << 13;
            v ^= t ^ t << 9;
            X[i] = v;
            me.i = i + 1 & 7;
            return v;
        };
        function init(me, seed) {
            var j, w, X = [];
            if (seed === (seed | 0)) // Seed state array using a 32-bit integer.
            w = X[0] = seed;
            else {
                // Seed state using a string.
                seed = "" + seed;
                for(j = 0; j < seed.length; ++j)X[j & 7] = X[j & 7] << 15 ^ seed.charCodeAt(j) + X[j + 1 & 7] << 13;
            }
            // Enforce an array length of 8, not all zeroes.
            while(X.length < 8)X.push(0);
            for(j = 0; j < 8 && X[j] === 0; ++j);
            if (j == 8) w = X[7] = -1;
            else w = X[j];
            me.x = X;
            me.i = 0;
            // Discard an initial 256 values.
            for(j = 256; j > 0; --j)me.next();
        }
        init(me, seed);
    }
    function copy(f, t) {
        t.x = f.x.slice();
        t.i = f.i;
        return t;
    }
    function impl(seed, opts) {
        if (seed == null) seed = +new Date;
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
            return (xg.next() >>> 0) / 0x100000000;
        };
        prng.double = function() {
            do var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 0x100000000, result = (top + bot) / 2097152;
            while (result === 0);
            return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
            if (state.x) copy(state, xg);
            prng.state = function() {
                return copy(xg, {});
            };
        }
        return prng;
    }
    if (module1 && module1.exports) module1.exports = impl;
    else if (define1 && define1.amd) define1(function() {
        return impl;
    });
    else this.xorshift7 = impl;
})(this, module, typeof define == "function" && define // present with an AMD loader
);

});

parcelRequire.register("bXpQH", function(module, exports) {
// A Javascript implementaion of Richard Brent's Xorgens xor4096 algorithm.
//
// This fast non-cryptographic random number generator is designed for
// use in Monte-Carlo algorithms. It combines a long-period xorshift
// generator with a Weyl generator, and it passes all common batteries
// of stasticial tests for randomness while consuming only a few nanoseconds
// for each prng generated.  For background on the generator, see Brent's
// paper: "Some long-period random number generators using shifts and xors."
// http://arxiv.org/pdf/1004.3115v1.pdf
//
// Usage:
//
// var xor4096 = require('xor4096');
// random = xor4096(1);                        // Seed with int32 or string.
// assert.equal(random(), 0.1520436450538547); // (0, 1) range, 53 bits.
// assert.equal(random.int32(), 1806534897);   // signed int32, 32 bits.
//
// For nonzero numeric keys, this impelementation provides a sequence
// identical to that by Brent's xorgens 3 implementaion in C.  This
// implementation also provides for initalizing the generator with
// string seeds, or for saving and restoring the state of the generator.
//
// On Chrome, this prng benchmarks about 2.1 times slower than
// Javascript's built-in Math.random().
(function(global, module1, define1) {
    function XorGen(seed) {
        var me = this;
        // Set up generator function.
        me.next = function() {
            var w = me.w, X = me.X, i = me.i, t, v;
            // Update Weyl generator.
            me.w = w = w + 0x61c88647 | 0;
            // Update xor generator.
            v = X[i + 34 & 127];
            t = X[i = i + 1 & 127];
            v ^= v << 13;
            t ^= t << 17;
            v ^= v >>> 15;
            t ^= t >>> 12;
            // Update Xor generator array state.
            v = X[i] = v ^ t;
            me.i = i;
            // Result is the combination.
            return v + (w ^ w >>> 16) | 0;
        };
        function init(me, seed) {
            var t, v, i, j, w, X = [], limit = 128;
            if (seed === (seed | 0)) {
                // Numeric seeds initialize v, which is used to generates X.
                v = seed;
                seed = null;
            } else {
                // String seeds are mixed into v and X one character at a time.
                seed = seed + "\x00";
                v = 0;
                limit = Math.max(limit, seed.length);
            }
            // Initialize circular array and weyl value.
            for(i = 0, j = -32; j < limit; ++j){
                // Put the unicode characters into the array, and shuffle them.
                if (seed) v ^= seed.charCodeAt((j + 32) % seed.length);
                // After 32 shuffles, take v as the starting w value.
                if (j === 0) w = v;
                v ^= v << 10;
                v ^= v >>> 15;
                v ^= v << 4;
                v ^= v >>> 13;
                if (j >= 0) {
                    w = w + 0x61c88647 | 0; // Weyl.
                    t = X[j & 127] ^= v + w; // Combine xor and weyl to init array.
                    i = 0 == t ? i + 1 : 0; // Count zeroes.
                }
            }
            // We have detected all zeroes; make the key nonzero.
            if (i >= 128) X[(seed && seed.length || 0) & 127] = -1;
            // Run the generator 512 times to further mix the state before using it.
            // Factoring this as a function slows the main generator, so it is just
            // unrolled here.  The weyl generator is not advanced while warming up.
            i = 127;
            for(j = 512; j > 0; --j){
                v = X[i + 34 & 127];
                t = X[i = i + 1 & 127];
                v ^= v << 13;
                t ^= t << 17;
                v ^= v >>> 15;
                t ^= t >>> 12;
                X[i] = v ^ t;
            }
            // Storing state as object members is faster than using closure variables.
            me.w = w;
            me.X = X;
            me.i = i;
        }
        init(me, seed);
    }
    function copy(f, t) {
        t.i = f.i;
        t.w = f.w;
        t.X = f.X.slice();
        return t;
    }
    function impl(seed, opts) {
        if (seed == null) seed = +new Date;
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
            return (xg.next() >>> 0) / 0x100000000;
        };
        prng.double = function() {
            do var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 0x100000000, result = (top + bot) / 2097152;
            while (result === 0);
            return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
            if (state.X) copy(state, xg);
            prng.state = function() {
                return copy(xg, {});
            };
        }
        return prng;
    }
    if (module1 && module1.exports) module1.exports = impl;
    else if (define1 && define1.amd) define1(function() {
        return impl;
    });
    else this.xor4096 = impl;
})(this, module, typeof define == "function" && define // present with an AMD loader
);

});

parcelRequire.register("8Vul2", function(module, exports) {
// A Javascript implementaion of the "Tyche-i" prng algorithm by
// Samuel Neves and Filipe Araujo.
// See https://eden.dei.uc.pt/~sneves/pubs/2011-snfa2.pdf
(function(global, module1, define1) {
    function XorGen(seed) {
        var me = this, strseed = "";
        // Set up generator function.
        me.next = function() {
            var b = me.b, c = me.c, d = me.d, a = me.a;
            b = b << 25 ^ b >>> 7 ^ c;
            c = c - d | 0;
            d = d << 24 ^ d >>> 8 ^ a;
            a = a - b | 0;
            me.b = b = b << 20 ^ b >>> 12 ^ c;
            me.c = c = c - d | 0;
            me.d = d << 16 ^ c >>> 16 ^ a;
            return me.a = a - b | 0;
        };
        /* The following is non-inverted tyche, which has better internal
   * bit diffusion, but which is about 25% slower than tyche-i in JS.
  me.next = function() {
    var a = me.a, b = me.b, c = me.c, d = me.d;
    a = (me.a + me.b | 0) >>> 0;
    d = me.d ^ a; d = d << 16 ^ d >>> 16;
    c = me.c + d | 0;
    b = me.b ^ c; b = b << 12 ^ d >>> 20;
    me.a = a = a + b | 0;
    d = d ^ a; me.d = d = d << 8 ^ d >>> 24;
    me.c = c = c + d | 0;
    b = b ^ c;
    return me.b = (b << 7 ^ b >>> 25);
  }
  */ me.a = 0;
        me.b = 0;
        me.c = -1640531527;
        me.d = 1367130551;
        if (seed === Math.floor(seed)) {
            // Integer seed.
            me.a = seed / 0x100000000 | 0;
            me.b = seed | 0;
        } else // String seed.
        strseed += seed;
        // Mix in string seed, then discard an initial batch of 64 values.
        for(var k = 0; k < strseed.length + 20; k++){
            me.b ^= strseed.charCodeAt(k) | 0;
            me.next();
        }
    }
    function copy(f, t) {
        t.a = f.a;
        t.b = f.b;
        t.c = f.c;
        t.d = f.d;
        return t;
    }
    function impl(seed, opts) {
        var xg = new XorGen(seed), state = opts && opts.state, prng = function() {
            return (xg.next() >>> 0) / 0x100000000;
        };
        prng.double = function() {
            do var top = xg.next() >>> 11, bot = (xg.next() >>> 0) / 0x100000000, result = (top + bot) / 2097152;
            while (result === 0);
            return result;
        };
        prng.int32 = xg.next;
        prng.quick = prng;
        if (state) {
            if (typeof state == "object") copy(state, xg);
            prng.state = function() {
                return copy(xg, {});
            };
        }
        return prng;
    }
    if (module1 && module1.exports) module1.exports = impl;
    else if (define1 && define1.amd) define1(function() {
        return impl;
    });
    else this.tychei = impl;
})(this, module, typeof define == "function" && define // present with an AMD loader
);

});

parcelRequire.register("kB6ZJ", function(module, exports) {
"use strict";

});

const $efdb03db049a6229$var$imageCaveTiles = document.getElementById("cave_tiles");
const $efdb03db049a6229$export$6ad4762b11da4c86 = {
    TOP_LEFT: {
        x: 0,
        y: 0,
        image: $efdb03db049a6229$var$imageCaveTiles
    },
    TOP: {
        x: 1,
        y: 0,
        image: $efdb03db049a6229$var$imageCaveTiles
    },
    TOP_RIGHT: {
        x: 2,
        y: 0,
        image: $efdb03db049a6229$var$imageCaveTiles
    },
    PILLAR_BOTTOM_RIGHT: {
        x: 3,
        y: 0,
        image: $efdb03db049a6229$var$imageCaveTiles
    },
    PILLAR_BOTTOM_LEFT: {
        x: 5,
        y: 0,
        image: $efdb03db049a6229$var$imageCaveTiles
    },
    LEFT: {
        x: 0,
        y: 1,
        image: $efdb03db049a6229$var$imageCaveTiles
    },
    FLOOR: {
        x: 1,
        y: 1,
        image: $efdb03db049a6229$var$imageCaveTiles
    },
    RIGHT: {
        x: 2,
        y: 1,
        image: $efdb03db049a6229$var$imageCaveTiles
    },
    PILLAR_TOP_RIGHT: {
        x: 3,
        y: 2,
        image: $efdb03db049a6229$var$imageCaveTiles
    },
    PILLAR_TOP_LEFT: {
        x: 5,
        y: 2,
        image: $efdb03db049a6229$var$imageCaveTiles
    },
    BOTTOM_LEFT: {
        x: 0,
        y: 2,
        image: $efdb03db049a6229$var$imageCaveTiles
    },
    BOTTOM: {
        x: 1,
        y: 2,
        image: $efdb03db049a6229$var$imageCaveTiles
    },
    BOTTOM_RIGHT: {
        x: 2,
        y: 2,
        image: $efdb03db049a6229$var$imageCaveTiles
    },
    WALL: {
        x: 4,
        y: 1,
        image: $efdb03db049a6229$var$imageCaveTiles
    },
    WALL_TWO: {
        x: 6,
        y: 2,
        image: $efdb03db049a6229$var$imageCaveTiles
    },
    DIAGONAL_BL_TO_TR: {
        x: 6,
        y: 0,
        image: $efdb03db049a6229$var$imageCaveTiles
    },
    DIAGONAL_BR_TO_TL: {
        x: 6,
        y: 1,
        image: $efdb03db049a6229$var$imageCaveTiles
    }
};


const $6de9c62a15e5c1f3$export$3b211992cf36885 = {
    TOP_LEFT: {
        name: "TOP_LEFT",
        weight: 1,
        sockets: {
            top: "WALL",
            bottom: "WALL_LEFT",
            left: "WALL",
            right: "WALL_TOP"
        }
    },
    TOP: {
        name: "TOP",
        weight: 2,
        sockets: {
            top: "WALL",
            bottom: "FLOOR",
            left: "WALL_TOP",
            right: "WALL_TOP"
        }
    },
    TOP_RIGHT: {
        name: "TOP_RIGHT",
        weight: 1,
        sockets: {
            top: "WALL",
            bottom: "WALL_RIGHT",
            left: "WALL_TOP",
            right: "WALL"
        }
    },
    LEFT: {
        name: "LEFT",
        weight: 2,
        sockets: {
            top: "WALL_LEFT",
            bottom: "WALL_LEFT",
            left: "WALL",
            right: "FLOOR"
        }
    },
    FLOOR: {
        name: "FLOOR",
        weight: 15,
        sockets: {
            top: "FLOOR",
            bottom: "FLOOR",
            left: "FLOOR",
            right: "FLOOR"
        }
    },
    RIGHT: {
        name: "RIGHT",
        weight: 2,
        sockets: {
            top: "WALL_RIGHT",
            bottom: "WALL_RIGHT",
            left: "FLOOR",
            right: "WALL"
        }
    },
    BOTTOM_LEFT: {
        name: "BOTTOM_LEFT",
        weight: 1,
        sockets: {
            top: "WALL_LEFT",
            bottom: "WALL",
            left: "WALL",
            right: "WALL_BOTTOM"
        }
    },
    BOTTOM: {
        name: "BOTTOM",
        weight: 2,
        sockets: {
            top: "FLOOR",
            bottom: "WALL",
            left: "WALL_BOTTOM",
            right: "WALL_BOTTOM"
        }
    },
    BOTTOM_RIGHT: {
        name: "BOTTOM_RIGHT",
        weight: 1,
        sockets: {
            top: "WALL_RIGHT",
            bottom: "WALL",
            left: "WALL_BOTTOM",
            right: "WALL"
        }
    },
    WALL: {
        name: "WALL",
        weight: 10,
        sockets: {
            top: "WALL",
            bottom: "WALL",
            left: "WALL",
            right: "WALL"
        }
    },
    WALL_TWO: {
        name: "WALL_TWO",
        weight: 2,
        sockets: {
            top: "WALL",
            bottom: "WALL",
            left: "WALL",
            right: "WALL"
        }
    },
    PILLAR_BOTTOM_LEFT: {
        name: "PILLAR_BOTTOM_LEFT",
        weight: 1,
        sockets: {
            top: "FLOOR",
            bottom: "WALL_LEFT",
            left: "WALL_BOTTOM",
            right: "FLOOR"
        }
    },
    PILLAR_BOTTOM_RIGHT: {
        name: "PILLAR_BOTTOM_RIGHT",
        weight: 1,
        sockets: {
            top: "FLOOR",
            bottom: "WALL_RIGHT",
            left: "FLOOR",
            right: "WALL_BOTTOM"
        }
    },
    PILLAR_TOP_LEFT: {
        name: "PILLAR_TOP_LEFT",
        weight: 1,
        sockets: {
            top: "WALL_LEFT",
            bottom: "FLOOR",
            left: "WALL_TOP",
            right: "FLOOR"
        }
    },
    PILLAR_TOP_RIGHT: {
        name: "PILLAR_TOP_RIGHT",
        weight: 1,
        sockets: {
            top: "WALL_RIGHT",
            bottom: "FLOOR",
            left: "FLOOR",
            right: "WALL_TOP"
        }
    },
    DIAGONAL_BL_TO_TR: {
        name: "DIAGONAL_BL_TO_TR",
        weight: 0,
        sockets: {
            top: "WALL_RIGHT",
            bottom: "WALL_LEFT",
            left: "WALL_BOTTOM",
            right: "WALL_TOP"
        }
    },
    DIAGONAL_BR_TO_TL: {
        name: "DIAGONAL_BR_TO_TL",
        weight: 0,
        sockets: {
            top: "WALL_LEFT",
            bottom: "WALL_RIGHT",
            left: "WALL_TOP",
            right: "WALL_BOTTOM"
        }
    }
};


const $cbc4508c509700da$export$2c9a6d1027132519 = 2048;
const $cbc4508c509700da$export$aeb116877fd5ad06 = 1536;
const $cbc4508c509700da$export$cf9ad17145f68381 = 64;
const $cbc4508c509700da$var$caveTileKeys = Object.keys((0, $6de9c62a15e5c1f3$export$3b211992cf36885));
const $cbc4508c509700da$export$9fb9d7328a602365 = $cbc4508c509700da$var$caveTileKeys.map((_, i)=>{
    const brightness = 255 - i * (255 / ($cbc4508c509700da$var$caveTileKeys.length - 1));
    return `rgb(${brightness} ${brightness} ${brightness})`;
});


const $6a82877664d11244$var$WALL_THRESHOLD = 0.5;
const $6a82877664d11244$var$LIVE_NEIGHBOR_THRESHOLD = 4;
const $6a82877664d11244$var$TOTAL_STEPS = 3;
const $6a82877664d11244$var$SOFTENING_STEPS = 1;
const $6a82877664d11244$var$CLEANUP_COUNT = 10;
class $6a82877664d11244$export$d6264d6c1c538357 {
    draw() {
        const squares = [
            ...new Array(this.gridWidth * this.gridHeight)
        ].map((_, index)=>{
            const { x: x, y: y } = this.getCoordinatesFromIndex(index);
            return {
                topLeft: this.getCell(x, y),
                bottomLeft: this.getCell(x, y + 1),
                bottomRight: this.getCell(x + 1, y + 1),
                topRight: this.getCell(x + 1, y),
                x: x,
                y: y
            };
        });
        this.drawFn(squares.map(({ x: x, y: y, ...corners })=>{
            const tileName = this.getTileName(corners);
            return {
                x: x,
                y: y,
                tileName: tileName === "WALL" && this.wallTwos[this.getIndexFromCoordinates(x, y)] ? "WALL_TWO" : tileName,
                entropy: 1
            };
        }));
    }
    getNeighborFloorCount(a, b) {
        let x;
        let y;
        let neighbourCellCount = 0;
        if (b === undefined) {
            const coordinates = this.getCoordinatesFromIndex(a);
            x = coordinates.x;
            y = coordinates.y;
        } else {
            x = a;
            y = b;
        }
        if (x > 0) {
            neighbourCellCount += this.getCellValue(x - 1, y);
            if (y > 0) neighbourCellCount += this.getCellValue(x - 1, y - 1);
        }
        if (y > 0) {
            neighbourCellCount += this.getCellValue(x, y - 1);
            if (x < this.gridWidth - 1) neighbourCellCount += this.getCellValue(x + 1, y - 1);
        }
        if (x < this.gridWidth - 1) {
            neighbourCellCount += this.getCellValue(x + 1, y);
            if (y < this.gridHeight - 1) neighbourCellCount += this.getCellValue(x + 1, y + 1);
        }
        if (y < this.gridHeight - 1) {
            neighbourCellCount += this.getCellValue(x, y + 1);
            if (x > 0) neighbourCellCount += this.getCellValue(x - 1, y + 1);
        }
        return neighbourCellCount;
    }
    findCaveSizes() {
        this.cells.map((_, index)=>{
            if (this.floodChecks[index]) return;
            this.floodFill(index);
        });
    }
    fillSmallCaves() {
        this.cells = this.cells.map((_, index)=>this.caveSizes[index] > 50);
    }
    floodFill(index) {
        const caveTiles = this.floodFillHelper(index, []);
        caveTiles.forEach((cellIndex)=>{
            this.caveSizes[cellIndex] = caveTiles.length;
        });
    }
    floodFillHelper(index, caveTiles) {
        // If this is a wall or has already been checked, ignore it
        if (!this.cells[index] || this.floodChecks[index]) return caveTiles;
        this.floodChecks[index] = true;
        const { x: x, y: y } = this.getCoordinatesFromIndex(index);
        const topTiles = this.floodFillHelper(this.getIndexFromCoordinates(x, y - 1), caveTiles);
        const bottomTiles = this.floodFillHelper(this.getIndexFromCoordinates(x, y + 1), caveTiles);
        const leftTiles = this.floodFillHelper(this.getIndexFromCoordinates(x - 1, y), caveTiles);
        const rightTiles = this.floodFillHelper(this.getIndexFromCoordinates(x + 1, y), caveTiles);
        return [
            ...caveTiles,
            index,
            ...topTiles,
            ...bottomTiles,
            ...leftTiles,
            ...rightTiles
        ];
    }
    constructor(draw, rng, gridWidth, gridHeight = gridWidth){
        this.startTime = 0;
        this.getTileName = ({ topLeft: topLeft, bottomLeft: bottomLeft, bottomRight: bottomRight, topRight: topRight })=>{
            // Pure floor and pure wall
            if (topLeft && topRight && bottomLeft && bottomRight) return "FLOOR";
            if (!topLeft && !topRight && !bottomLeft && !bottomRight) return "WALL";
            // Edges
            if (topLeft && topRight && !bottomLeft && !bottomRight) return "BOTTOM";
            if (!topLeft && !topRight && bottomLeft && bottomRight) return "TOP";
            if (topLeft && !topRight && bottomLeft && !bottomRight) return "RIGHT";
            if (!topLeft && topRight && !bottomLeft && bottomRight) return "LEFT";
            // Inside corners
            if (!topLeft && !topRight && !bottomLeft && bottomRight) return "TOP_LEFT";
            if (!topLeft && !topRight && bottomLeft && !bottomRight) return "TOP_RIGHT";
            if (!topLeft && topRight && !bottomLeft && !bottomRight) return "BOTTOM_LEFT";
            if (topLeft && !topRight && !bottomLeft && !bottomRight) return "BOTTOM_RIGHT";
            // Outside corners
            if (!topLeft && topRight && bottomLeft && bottomRight) return "PILLAR_TOP_LEFT";
            if (topLeft && !topRight && bottomLeft && bottomRight) return "PILLAR_TOP_RIGHT";
            if (topLeft && topRight && !bottomLeft && bottomRight) return "PILLAR_BOTTOM_LEFT";
            if (topLeft && topRight && bottomLeft && !bottomRight) return "PILLAR_BOTTOM_RIGHT";
            if (!topLeft && topRight && bottomLeft && !bottomRight) return "DIAGONAL_BR_TO_TL";
            if (topLeft && !topRight && !bottomLeft && bottomRight) return "DIAGONAL_BL_TO_TR";
            throw new Error(`Unknown tile configuration:
 ${topLeft ? "FLOOR" : " WALL"} - ${topRight ? "FLOOR" : "WALL"}
   |      |
 ${bottomLeft ? "FLOOR" : " WALL"} - ${bottomRight ? "FLOOR" : "WALL"}
`);
        };
        this.getCoordinatesFromIndex = (index)=>({
                x: index % this.gridWidth,
                y: Math.floor(index / this.gridWidth)
            });
        this.getIndexFromCoordinates = (x, y)=>{
            if (x < 0 || y < 0 || x > this.gridWidth || y > this.gridHeight) return -1;
            return x + y * this.gridWidth;
        };
        this.getCell = (x, y)=>{
            const index = this.getIndexFromCoordinates(x, y);
            // Treat imaginary cells outside the grid as walls
            if (index < 0) return false;
            return this.cells[index];
        };
        this.getCellValue = (x, y)=>this.getCell(x, y) ? 1 : 0;
        this.step = ({ threshold: threshold = $6a82877664d11244$var$LIVE_NEIGHBOR_THRESHOLD, lockFloor: lockFloor = false } = {})=>{
            this.stepCount++;
            this.cells = this.cells.map((isFloor, index)=>{
                if (isFloor && lockFloor) return true;
                const neighborFloorCount = this.getNeighborFloorCount(index);
                if (neighborFloorCount > threshold) return true;
                else if (neighborFloorCount < threshold) return false;
                return isFloor;
            });
        };
        this.expandWalls = ()=>{
            this.step({
                threshold: 8
            });
        };
        this.cleanup = ()=>{
            this.step({
                threshold: 5,
                lockFloor: true
            });
        };
        this.run = ()=>{
            console.log(`Generating a ${this.gridWidth - 1}x${this.gridHeight - 1} grid (${(this.gridWidth - 1) * (this.gridHeight - 1)} cells) with ${$6a82877664d11244$var$TOTAL_STEPS} steps …`);
            this.startTime = new Date().getTime();
            while(this.stepCount < $6a82877664d11244$var$TOTAL_STEPS - $6a82877664d11244$var$SOFTENING_STEPS)this.step();
            while(this.stepCount < $6a82877664d11244$var$TOTAL_STEPS)this.step({
                threshold: $6a82877664d11244$var$LIVE_NEIGHBOR_THRESHOLD - 2
            });
            for(let i = 0; i < $6a82877664d11244$var$CLEANUP_COUNT; i++)this.cleanup();
            this.expandWalls();
            this.findCaveSizes();
            this.fillSmallCaves();
            console.log(`Finished in ${new Date().getTime() - this.startTime}ms`);
        };
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.drawFn = draw;
        this.stepCount = 0;
        this.rng = rng;
        this.cells = [
            ...new Array(gridWidth * gridHeight)
        ].map(()=>rng() > $6a82877664d11244$var$WALL_THRESHOLD);
        this.wallTwos = this.cells.map(()=>rng() > 0.9);
        this.floodChecks = this.cells.map(()=>false);
        this.caveSizes = this.cells.map(()=>0);
    }
}



class $092c7663a47c897d$export$f6f0c3fe4ec306ea {
    get isCollapsed() {
        return this.domain.length === 1;
    }
    get entropy() {
        return this.domain.length;
    }
    get neighbors() {
        return [
            this.top,
            this.bottom,
            this.left,
            this.right
        ].filter((neighbor)=>Boolean(neighbor));
    }
    get tileName() {
        return this.entropy === 1 ? this.domain[0] : undefined;
    }
    getPotentialSockets(direction) {
        return this.domain.reduce((acc, tile)=>[
                ...acc,
                (0, $6de9c62a15e5c1f3$export$3b211992cf36885)[tile].sockets[direction]
            ], []);
    }
    constructor(x, y, rng, gridWidth, gridHeight){
        this.setNeighbors = (cells)=>{
            this.top = this.y === 0 ? undefined : cells[this.x + this.gridWidth * (this.y - 1)];
            this.bottom = this.y === this.gridHeight - 1 ? undefined : cells[this.x + this.gridWidth * (this.y + 1)];
            this.left = this.x === 0 ? undefined : cells[this.x - 1 + this.gridWidth * this.y];
            this.right = this.x === this.gridWidth - 1 ? undefined : cells[this.x + 1 + this.gridWidth * this.y];
        };
        this.updateDomain = (forceUpdateNeighbors = false)=>{
            if (this.isCollapsed && !forceUpdateNeighbors) return;
            const initialDomainSize = this.domain.length;
            this.domain = this.domain.filter((tileName)=>{
                var _this_top, _this_bottom, _this_left, _this_right;
                const tile = (0, $6de9c62a15e5c1f3$export$3b211992cf36885)[tileName];
                if (this.top && !((_this_top = this.top) === null || _this_top === void 0 ? void 0 : _this_top.getPotentialSockets("bottom").includes(tile.sockets.top))) return false;
                if (this.bottom && !((_this_bottom = this.bottom) === null || _this_bottom === void 0 ? void 0 : _this_bottom.getPotentialSockets("top").includes(tile.sockets.bottom))) return false;
                if (this.left && !((_this_left = this.left) === null || _this_left === void 0 ? void 0 : _this_left.getPotentialSockets("right").includes(tile.sockets.left))) return false;
                if (this.right && !((_this_right = this.right) === null || _this_right === void 0 ? void 0 : _this_right.getPotentialSockets("left").includes(tile.sockets.right))) return false;
                return true;
            });
            if (this.domain.length === 0) throw new Error(`Cell at (${this.x}, ${this.y}) has an empty domain!`);
            // update neighbors if this cell changed
            if (forceUpdateNeighbors || this.domain.length !== initialDomainSize) this.neighbors.forEach((neighbor)=>neighbor.updateDomain());
        };
        this.collapse = ()=>{
            // Choose a random tile from the domain, based on the weight of each tile
            const randomNumber = this.rng();
            const totalWeight = this.domain.reduce((sum, tile)=>sum + (0, $6de9c62a15e5c1f3$export$3b211992cf36885)[tile].weight, 0);
            let chosenTile = undefined;
            let runningSum = 0;
            this.domain.forEach((tile)=>{
                if (chosenTile) return;
                runningSum += (0, $6de9c62a15e5c1f3$export$3b211992cf36885)[tile].weight;
                if (randomNumber < runningSum / totalWeight) chosenTile = tile;
            });
            this.domain = [
                chosenTile !== null && chosenTile !== void 0 ? chosenTile : this.domain[0]
            ];
            // Update neighbors
            this.updateDomain(true);
        };
        this.x = x;
        this.y = y;
        this.rng = rng;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.domain = Object.keys((0, $6de9c62a15e5c1f3$export$3b211992cf36885));
        if (this.x === 0 || this.y === 0 || this.x === this.gridWidth - 1 || this.y === this.gridHeight - 1) this.domain = [
            "WALL",
            "WALL_TWO"
        ];
    }
}


const $6b84cfb86d6c6bc6$var$ZONE_WIDTH = 16;
const $6b84cfb86d6c6bc6$var$ZONE_HEIGHT = 12;
function $6b84cfb86d6c6bc6$var$shuffleArray(array, rng) {
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(rng() * (i + 1));
        [array[i], array[j]] = [
            array[j],
            array[i]
        ];
    }
}
class $6b84cfb86d6c6bc6$export$75493ecd6c76042 {
    setCurrentZone(x, y) {
        this.currentZone = this.cells.filter((cell)=>cell.x >= x && cell.x < x + $6b84cfb86d6c6bc6$var$ZONE_WIDTH && cell.y >= y && cell.y < y + $6b84cfb86d6c6bc6$var$ZONE_HEIGHT, []);
        this.uncollapsedCells = this.currentZone.filter((cell)=>!cell.isCollapsed);
        $6b84cfb86d6c6bc6$var$shuffleArray(this.uncollapsedCells, this.rng);
    }
    constructor(draw, rng, gridWidth, gridHeight = gridWidth){
        this.startTime = 0;
        this.lowestEntropyCellIndex = 0;
        this.run = (drawSteps = false)=>{
            try {
                console.log(`Generating a ${this.gridWidth}x${this.gridHeight} grid (${this.gridWidth * this.gridHeight} cells) ...`);
                this.startTime = new Date().getTime();
                if (drawSteps) return this.runAsync();
                for(let y = 0; y < this.gridHeight; y += $6b84cfb86d6c6bc6$var$ZONE_HEIGHT)for(let x = 0; x < this.gridWidth; x += $6b84cfb86d6c6bc6$var$ZONE_WIDTH)this.runZone(x, y);
                console.log(`Finished in ${new Date().getTime() - this.startTime}ms`);
            } finally{
                this.draw();
            }
        };
        this.runAsync = async ()=>{
            for(let y = 0; y < this.gridHeight; y += $6b84cfb86d6c6bc6$var$ZONE_HEIGHT)for(let x = 0; x < this.gridWidth; x += $6b84cfb86d6c6bc6$var$ZONE_WIDTH)await this.runZoneAsync(x, y);
            this.draw();
            console.log(`Finished in ${new Date().getTime() - this.startTime}ms`);
        };
        this.runZone = (x, y)=>{
            this.setCurrentZone(x, y);
            // choose random cell and collapse
            const index = Math.floor(this.rng() * this.uncollapsedCells.length);
            const cell = this.uncollapsedCells[index];
            cell.collapse();
            // Step through the zone until all of its cells are collapsed
            this.step();
        };
        this.runZoneAsync = async (x, y)=>{
            this.setCurrentZone(x, y);
            // choose random cell and collapse
            const index = Math.floor(this.rng() * this.uncollapsedCells.length);
            const cell = this.uncollapsedCells[index];
            cell.collapse();
            // Step through the zone until all of its cells are collapsed
            await this.stepAsync();
        };
        this.step = ()=>{
            const lowestEntropyCell = this.findLowestEntropyCell();
            // There are no more cells to collapse
            if (!lowestEntropyCell) return;
            lowestEntropyCell.collapse();
            this.step();
        };
        this.stepAsync = async ()=>{
            const lowestEntropyCell = this.findLowestEntropyCell();
            // There are no more cells to collapse
            if (!lowestEntropyCell) return;
            lowestEntropyCell.collapse();
            this.draw();
            await new Promise((resolve)=>requestAnimationFrame(()=>resolve(this.stepAsync())));
        };
        this.findLowestEntropyCell = ()=>{
            this.uncollapsedCells = this.uncollapsedCells.filter((cell)=>!cell.isCollapsed);
            if (this.uncollapsedCells.length === 0) return undefined;
            let lowestEntropyCell = this.uncollapsedCells[0];
            this.lowestEntropyCellIndex = 0;
            for(let i = 0; i < this.uncollapsedCells.length && lowestEntropyCell.entropy > 2; i++){
                const cell = this.uncollapsedCells[i];
                if (cell.entropy < lowestEntropyCell.entropy) {
                    lowestEntropyCell = cell;
                    this.lowestEntropyCellIndex = i;
                }
            }
            return lowestEntropyCell;
        };
        this.draw = ()=>draw(this.cells);
        this.rng = rng;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.cells = [
            ...new Array(gridWidth * gridHeight)
        ].map((_, i)=>new (0, $092c7663a47c897d$export$f6f0c3fe4ec306ea)(i % gridWidth, Math.floor(i / gridWidth), this.rng, gridWidth, gridHeight));
        this.cells.forEach((cell)=>cell.setNeighbors(this.cells));
        this.setCurrentZone(0, 0);
    }
}


var $2bd6497a16323b84$exports = {};
// A library of seedable RNGs implemented in Javascript.
//
// Usage:
//
// var seedrandom = require('seedrandom');
// var random = seedrandom(1); // or any seed.
// var x = random();       // 0 <= x < 1.  Every bit is random.
// var x = random.quick(); // 0 <= x < 1.  32 bits of randomness.
// alea, a 53-bit multiply-with-carry generator by Johannes Baagøe.
// Period: ~2^116
// Reported to pass all BigCrush tests.

var $bibMu = parcelRequire("bibMu");

var $5CmGf = parcelRequire("5CmGf");

var $bt3an = parcelRequire("bt3an");

var $dAg3S = parcelRequire("dAg3S");

var $bXpQH = parcelRequire("bXpQH");

var $8Vul2 = parcelRequire("8Vul2");
var $5ee74126884af281$exports = {};

/*
Copyright 2019 David Bau.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

*/ (function(global, pool, math) {
    //
    // The following constants are related to IEEE 754 limits.
    //
    var width = 256, chunks = 6, digits = 52, rngname = "random", startdenom = math.pow(width, chunks), significance = math.pow(2, digits), overflow = significance * 2, mask = width - 1, nodecrypto; // node.js crypto module, initialized at the bottom.
    //
    // seedrandom()
    // This is the seedrandom function described above.
    //
    function seedrandom(seed, options, callback) {
        var key = [];
        options = options == true ? {
            entropy: true
        } : options || {};
        // Flatten the seed string or build one from local entropy if needed.
        var shortseed = mixkey(flatten(options.entropy ? [
            seed,
            tostring(pool)
        ] : seed == null ? autoseed() : seed, 3), key);
        // Use the seed to initialize an ARC4 generator.
        var arc4 = new ARC4(key);
        // This function returns a random double in [0, 1) that contains
        // randomness in every bit of the mantissa of the IEEE 754 value.
        var prng = function() {
            var n = arc4.g(chunks), d = startdenom, x = 0; //   and no 'extra last byte'.
            while(n < significance){
                n = (n + x) * width; //   shifting numerator and
                d *= width; //   denominator and generating a
                x = arc4.g(1); //   new least-significant-byte.
            }
            while(n >= overflow){
                n /= 2; //   last byte, shift everything
                d /= 2; //   right using integer math until
                x >>>= 1; //   we have exactly the desired bits.
            }
            return (n + x) / d; // Form the number within [0, 1).
        };
        prng.int32 = function() {
            return arc4.g(4) | 0;
        };
        prng.quick = function() {
            return arc4.g(4) / 0x100000000;
        };
        prng.double = prng;
        // Mix the randomness into accumulated entropy.
        mixkey(tostring(arc4.S), pool);
        // Calling convention: what to return as a function of prng, seed, is_math.
        return (options.pass || callback || function(prng, seed, is_math_call, state) {
            if (state) {
                // Load the arc4 state from the given state if it has an S array.
                if (state.S) copy(state, arc4);
                // Only provide the .state method if requested via options.state.
                prng.state = function() {
                    return copy(arc4, {});
                };
            }
            // If called as a method of Math (Math.seedrandom()), mutate
            // Math.random because that is how seedrandom.js has worked since v1.0.
            if (is_math_call) {
                math[rngname] = prng;
                return seed;
            } else return prng;
        })(prng, shortseed, "global" in options ? options.global : this == math, options.state);
    }
    //
    // ARC4
    //
    // An ARC4 implementation.  The constructor takes a key in the form of
    // an array of at most (width) integers that should be 0 <= x < (width).
    //
    // The g(count) method returns a pseudorandom integer that concatenates
    // the next (count) outputs from ARC4.  Its return value is a number x
    // that is in the range 0 <= x < (width ^ count).
    //
    function ARC4(key) {
        var t, keylen = key.length, me = this, i = 0, j = me.i = me.j = 0, s = me.S = [];
        // The empty key [] is treated as [0].
        if (!keylen) key = [
            keylen++
        ];
        // Set up S using the standard key scheduling algorithm.
        while(i < width)s[i] = i++;
        for(i = 0; i < width; i++){
            s[i] = s[j = mask & j + key[i % keylen] + (t = s[i])];
            s[j] = t;
        }
        // The "g" method returns the next (count) outputs as one number.
        (me.g = function(count) {
            // Using instance members instead of closure state nearly doubles speed.
            var t, r = 0, i = me.i, j = me.j, s = me.S;
            while(count--){
                t = s[i = mask & i + 1];
                r = r * width + s[mask & (s[i] = s[j = mask & j + t]) + (s[j] = t)];
            }
            me.i = i;
            me.j = j;
            return r;
        // For robust unpredictability, the function call below automatically
        // discards an initial batch of values.  This is called RC4-drop[256].
        // See http://google.com/search?q=rsa+fluhrer+response&btnI
        })(width);
    }
    //
    // copy()
    // Copies internal state of ARC4 to or from a plain object.
    //
    function copy(f, t) {
        t.i = f.i;
        t.j = f.j;
        t.S = f.S.slice();
        return t;
    }
    //
    // flatten()
    // Converts an object tree to nested arrays of strings.
    //
    function flatten(obj, depth) {
        var result = [], typ = typeof obj, prop;
        if (depth && typ == "object") {
            for(prop in obj)try {
                result.push(flatten(obj[prop], depth - 1));
            } catch (e) {}
        }
        return result.length ? result : typ == "string" ? obj : obj + "\x00";
    }
    //
    // mixkey()
    // Mixes a string seed into a key that is an array of integers, and
    // returns a shortened string seed that is equivalent to the result key.
    //
    function mixkey(seed, key) {
        var stringseed = seed + "", smear, j = 0;
        while(j < stringseed.length)key[mask & j] = mask & (smear ^= key[mask & j] * 19) + stringseed.charCodeAt(j++);
        return tostring(key);
    }
    //
    // autoseed()
    // Returns an object for autoseeding, using window.crypto and Node crypto
    // module if available.
    //
    function autoseed() {
        try {
            var out;
            if (nodecrypto && (out = nodecrypto.randomBytes)) // The use of 'out' to remember randomBytes makes tight minified code.
            out = out(width);
            else {
                out = new Uint8Array(width);
                (global.crypto || global.msCrypto).getRandomValues(out);
            }
            return tostring(out);
        } catch (e) {
            var browser = global.navigator, plugins = browser && browser.plugins;
            return [
                +new Date,
                global,
                plugins,
                global.screen,
                tostring(pool)
            ];
        }
    }
    //
    // tostring()
    // Converts an array of charcodes to a string
    //
    function tostring(a) {
        return String.fromCharCode.apply(0, a);
    }
    //
    // When seedrandom.js is loaded, we immediately mix a few bits
    // from the built-in RNG into the entropy pool.  Because we do
    // not want to interfere with deterministic PRNG state later,
    // seedrandom will not call math.random on its own again after
    // initialization.
    //
    mixkey(math.random(), pool);
    //
    // Nodejs and AMD support: export the implementation as a module using
    // either convention.
    //
    if (0, $5ee74126884af281$exports) {
        $5ee74126884af281$exports = seedrandom;
        // When in node.js, try using crypto package for autoseeding.
        try {
            nodecrypto = (parcelRequire("kB6ZJ"));
        } catch (ex) {}
    } else if (typeof define == "function" && define.amd) define(function() {
        return seedrandom;
    });
    else // When included as a plain script, set up Math.seedrandom global.
    math["seed" + rngname] = seedrandom;
// End anonymous scope, and pass initial values.
})(// global: `self` in browsers (including strict mode and web workers),
// otherwise `this` in Node and other environments
typeof self !== "undefined" ? self : $5ee74126884af281$exports, [], Math // math: package containing random, pow, and seedrandom
);


$5ee74126884af281$exports.alea = $bibMu;
$5ee74126884af281$exports.xor128 = $5CmGf;
$5ee74126884af281$exports.xorwow = $bt3an;
$5ee74126884af281$exports.xorshift7 = $dAg3S;
$5ee74126884af281$exports.xor4096 = $bXpQH;
$5ee74126884af281$exports.tychei = $8Vul2;
$2bd6497a16323b84$exports = $5ee74126884af281$exports;


class $5b04a72b07ba29da$export$73a0875014f71b1f {
    set showGrid(showGrid) {
        this._showGrid = showGrid;
        this.drawCave();
    }
    set cellSize(size) {
        switch(size){
            case "large":
                this._cellSize = 16;
                return;
            case "medium":
                this._cellSize = 32;
                return;
            case "small":
            default:
                this._cellSize = 64;
                return;
        }
    }
    get showGrid() {
        return this._showGrid;
    }
    constructor(context, algorithm = "cellular-automata"){
        this._showGrid = false;
        this._cellSize = 64;
        this.drawCell = (cell)=>{
            if (!this.context) return;
            const x = cell.x * this._cellSize;
            const y = cell.y * this._cellSize;
            // Wave Function Collapse - uncollapsed cell
            if (cell.entropy > 1) {
                this.context.fillStyle = (0, $cbc4508c509700da$export$9fb9d7328a602365)[cell.entropy - 1];
                this.context.fillRect(x, y, this._cellSize, this._cellSize);
            }
            if (!cell.tileName) return;
            const imageDetails = (0, $efdb03db049a6229$export$6ad4762b11da4c86)[cell.tileName];
            if (!imageDetails) throw new Error(`Could not find image details for ${cell.tileName}`);
            if (!imageDetails.image) return;
            this.context.drawImage(imageDetails.image, imageDetails.x * (0, $cbc4508c509700da$export$cf9ad17145f68381), imageDetails.y * (0, $cbc4508c509700da$export$cf9ad17145f68381), (0, $cbc4508c509700da$export$cf9ad17145f68381), (0, $cbc4508c509700da$export$cf9ad17145f68381), x, y, this._cellSize, this._cellSize);
        };
        this.drawGridLines = ()=>{
            if (!this.context || !this.showGrid) return;
            this.context.strokeStyle = "#333";
            this.context.lineWidth = 0.25;
            this.context.beginPath();
            for(let x = 0; x < (0, $cbc4508c509700da$export$2c9a6d1027132519); x += this._cellSize){
                this.context.moveTo(x, 0);
                this.context.lineTo(x, (0, $cbc4508c509700da$export$aeb116877fd5ad06));
            }
            for(let y = 0; y < (0, $cbc4508c509700da$export$aeb116877fd5ad06); y += this._cellSize){
                this.context.moveTo(0, y);
                this.context.lineTo((0, $cbc4508c509700da$export$2c9a6d1027132519), y);
            }
            this.context.stroke();
            this.context.closePath();
        };
        this.drawGrid = (cells)=>{
            if (!this.context) return;
            this.context.clearRect(0, 0, (0, $cbc4508c509700da$export$2c9a6d1027132519), (0, $cbc4508c509700da$export$aeb116877fd5ad06));
            cells.forEach((cell)=>this.drawCell(cell));
            this.drawGridLines();
        };
        this.generate = async ()=>{
            const rng = this.seed ? (0, (/*@__PURE__*/$parcel$interopDefault($2bd6497a16323b84$exports)))(this.seed) : Math.random;
            const rows = Math.floor((0, $cbc4508c509700da$export$2c9a6d1027132519) / this._cellSize);
            const columns = Math.floor((0, $cbc4508c509700da$export$aeb116877fd5ad06) / this._cellSize);
            if (this.algorithm === "cellular-automata") {
                const ca = new (0, $6a82877664d11244$export$d6264d6c1c538357)(this.drawGrid, rng, rows + 1, columns + 1);
                ca.run();
                ca.draw();
                this.drawCave = ()=>ca.draw();
            } else {
                const wfc = new (0, $6b84cfb86d6c6bc6$export$75493ecd6c76042)(this.drawGrid, rng, rows, columns);
                await wfc.run(true);
                this.drawCave = ()=>wfc.draw();
            }
        };
        this.context = context;
        this.algorithm = algorithm;
    }
}


// DOM elements
const $35d6c5b58b8fcd66$var$canvas = document.querySelector("canvas.wfc");
const $35d6c5b58b8fcd66$var$context = $35d6c5b58b8fcd66$var$canvas === null || $35d6c5b58b8fcd66$var$canvas === void 0 ? void 0 : $35d6c5b58b8fcd66$var$canvas.getContext("2d");
const $35d6c5b58b8fcd66$var$showGridCheckbox = document.getElementById("show-grid");
const $35d6c5b58b8fcd66$var$algorithmSelector = document.getElementById("algorithm");
const $35d6c5b58b8fcd66$var$seedInput = document.getElementById("seed");
const $35d6c5b58b8fcd66$var$sizeSelector = document.getElementById("size");
const $35d6c5b58b8fcd66$var$regenerateButton = document.getElementById("regenerate");
const $35d6c5b58b8fcd66$var$downloadButton = document.getElementById("download");
const $35d6c5b58b8fcd66$var$caveGenerator = new (0, $5b04a72b07ba29da$export$73a0875014f71b1f)($35d6c5b58b8fcd66$var$context);
const $35d6c5b58b8fcd66$var$generateCave = async ()=>{
    if ($35d6c5b58b8fcd66$var$regenerateButton) $35d6c5b58b8fcd66$var$regenerateButton.disabled = true;
    if ($35d6c5b58b8fcd66$var$downloadButton) $35d6c5b58b8fcd66$var$downloadButton.disabled = true;
    var _algorithmSelector_value;
    $35d6c5b58b8fcd66$var$caveGenerator.algorithm = (_algorithmSelector_value = $35d6c5b58b8fcd66$var$algorithmSelector === null || $35d6c5b58b8fcd66$var$algorithmSelector === void 0 ? void 0 : $35d6c5b58b8fcd66$var$algorithmSelector.value) !== null && _algorithmSelector_value !== void 0 ? _algorithmSelector_value : "cellular-automata";
    $35d6c5b58b8fcd66$var$caveGenerator.seed = ($35d6c5b58b8fcd66$var$seedInput === null || $35d6c5b58b8fcd66$var$seedInput === void 0 ? void 0 : $35d6c5b58b8fcd66$var$seedInput.value) || undefined;
    $35d6c5b58b8fcd66$var$caveGenerator.cellSize = $35d6c5b58b8fcd66$var$sizeSelector === null || $35d6c5b58b8fcd66$var$sizeSelector === void 0 ? void 0 : $35d6c5b58b8fcd66$var$sizeSelector.value;
    await $35d6c5b58b8fcd66$var$caveGenerator.generate();
    if ($35d6c5b58b8fcd66$var$regenerateButton) $35d6c5b58b8fcd66$var$regenerateButton.disabled = false;
    if ($35d6c5b58b8fcd66$var$downloadButton) $35d6c5b58b8fcd66$var$downloadButton.disabled = false;
};
$35d6c5b58b8fcd66$var$generateCave();
// Event listeners
$35d6c5b58b8fcd66$var$showGridCheckbox === null || $35d6c5b58b8fcd66$var$showGridCheckbox === void 0 ? void 0 : $35d6c5b58b8fcd66$var$showGridCheckbox.addEventListener("change", (e)=>{
    const target = e.target;
    if (!target) return;
    $35d6c5b58b8fcd66$var$caveGenerator.showGrid = target.checked;
});
$35d6c5b58b8fcd66$var$regenerateButton === null || $35d6c5b58b8fcd66$var$regenerateButton === void 0 ? void 0 : $35d6c5b58b8fcd66$var$regenerateButton.addEventListener("click", ()=>{
    $35d6c5b58b8fcd66$var$generateCave();
});
$35d6c5b58b8fcd66$var$downloadButton === null || $35d6c5b58b8fcd66$var$downloadButton === void 0 ? void 0 : $35d6c5b58b8fcd66$var$downloadButton.addEventListener("click", ()=>{
    if (!$35d6c5b58b8fcd66$var$canvas) return;
    const link = document.createElement("a");
    link.download = "cave.png";
    link.href = $35d6c5b58b8fcd66$var$canvas.toDataURL();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});


//# sourceMappingURL=index.35d55d90.js.map
