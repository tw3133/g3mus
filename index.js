var h;
h ||= typeof Module != 'undefined' ? Module : {};
var aa = !!globalThis.window, ba = !!globalThis.WorkerGlobalScope, ca = globalThis.process?.versions?.node && "renderer" != globalThis.process?.type, da = [], ea = "./this.program", fa = (a, b) => {
  throw b;
}, ha = globalThis.document?.currentScript?.src;
"undefined" != typeof __filename ? ha = __filename : ba && (ha = self.location.href);
var ia = "", ja, ka;
if (ca) {
  var fs = require("node:fs");
  ia = __dirname + "/";
  ka = a => {
    a = la(a) ? new URL(a) : a;
    return fs.readFileSync(a);
  };
  ja = async a => {
    a = la(a) ? new URL(a) : a;
    return fs.readFileSync(a, void 0);
  };
  1 < process.argv.length && (ea = process.argv[1].replace(/\\/g, "/"));
  da = process.argv.slice(2);
  "undefined" != typeof module && (module.exports = h);
  fa = (a, b) => {
    process.exitCode = a;
    throw b;
  };
} else if (aa || ba) {
  try {
    ia = (new URL(".", ha)).href;
  } catch {
  }
  ba && (ka = a => {
    var b = new XMLHttpRequest();
    b.open("GET", a, !1);
    b.responseType = "arraybuffer";
    b.send(null);
    return new Uint8Array(b.response);
  });
  ja = async a => {
    if (la(a)) {
      return new Promise((c, d) => {
        var e = new XMLHttpRequest();
        e.open("GET", a, !0);
        e.responseType = "arraybuffer";
        e.onload = () => {
          200 == e.status || 0 == e.status && e.response ? c(e.response) : d(e.status);
        };
        e.onerror = d;
        e.send(null);
      });
    }
    var b = await fetch(a, {credentials:"same-origin"});
    if (b.ok) {
      return b.arrayBuffer();
    }
    throw Error(b.status + " : " + b.url);
  };
}
var ma = console.log.bind(console), k = console.error.bind(console), na, oa = !1, qa, la = a => a.startsWith("file://"), m, n, ra, sa, r, t, v, w, ta;
function ua(a) {
  h.onAbort?.(a);
  a = "Aborted(" + a + ")";
  k(a);
  oa = !0;
  throw new WebAssembly.RuntimeError(a + ". Build with -sASSERTIONS for more info.");
}
var va;
async function wa(a) {
  if (!na) {
    try {
      var b = await ja(a);
      return new Uint8Array(b);
    } catch {
    }
  }
  if (a == va && na) {
    a = new Uint8Array(na);
  } else {
    if (ka) {
      a = ka(a);
    } else {
      throw "both async and sync fetching of the wasm failed";
    }
  }
  return a;
}
async function xa(a, b) {
  try {
    var c = await wa(a);
    return await WebAssembly.instantiate(c, b);
  } catch (d) {
    k(`failed to asynchronously prepare wasm: ${d}`), ua(d);
  }
}
async function ya(a) {
  var b = va;
  if (!na && !la(b) && !ca) {
    try {
      var c = fetch(b, {credentials:"same-origin"});
      return await WebAssembly.instantiateStreaming(c, a);
    } catch (d) {
      k(`wasm streaming compile failed: ${d}`), k("falling back to ArrayBuffer instantiation");
    }
  }
  return xa(b, a);
}
class za {
  name="ExitStatus";
  constructor(a) {
    this.message = `Program terminated with exit(${a})`;
    this.status = a;
  }
}
var Aa = a => {
  for (; 0 < a.length;) {
    a.shift()(h);
  }
}, Ba = [], Ca = [], Da = () => {
  var a = h.preRun.shift();
  Ca.push(a);
}, Ea = 0, Fa = null, Ga = !0, Ha = globalThis.TextDecoder && new TextDecoder(), y = (a, b = 0, c) => {
  var d = b;
  for (c = d + c; a[d] && !(d >= c);) {
    ++d;
  }
  if (16 < d - b && a.buffer && Ha) {
    return Ha.decode(a.subarray(b, d));
  }
  for (c = ""; b < d;) {
    var e = a[b++];
    if (e & 128) {
      var f = a[b++] & 63;
      if (192 == (e & 224)) {
        c += String.fromCharCode((e & 31) << 6 | f);
      } else {
        var g = a[b++] & 63;
        e = 224 == (e & 240) ? (e & 15) << 12 | f << 6 | g : (e & 7) << 18 | f << 12 | g << 6 | a[b++] & 63;
        65536 > e ? c += String.fromCharCode(e) : (e -= 65536, c += String.fromCharCode(55296 | e >> 10, 56320 | e & 1023));
      }
    } else {
      c += String.fromCharCode(e);
    }
  }
  return c;
}, Ia = (a, b) => {
  for (var c = 0, d = a.length - 1; 0 <= d; d--) {
    var e = a[d];
    "." === e ? a.splice(d, 1) : ".." === e ? (a.splice(d, 1), c++) : c && (a.splice(d, 1), c--);
  }
  if (b) {
    for (; c; c--) {
      a.unshift("..");
    }
  }
  return a;
}, Ja = a => {
  var b = "/" === a.charAt(0), c = "/" === a.slice(-1);
  (a = Ia(a.split("/").filter(d => !!d), !b).join("/")) || b || (a = ".");
  a && c && (a += "/");
  return (b ? "/" : "") + a;
}, Ka = a => {
  var b = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/.exec(a).slice(1);
  a = b[0];
  b = b[1];
  if (!a && !b) {
    return ".";
  }
  b &&= b.slice(0, -1);
  return a + b;
}, La = () => {
  if (ca) {
    var a = require("node:crypto");
    return b => a.randomFillSync(b);
  }
  return b => crypto.getRandomValues(b);
}, Ma = a => {
  (Ma = La())(a);
}, Na = (...a) => {
  for (var b = "", c = !1, d = a.length - 1; -1 <= d && !c; d--) {
    c = 0 <= d ? a[d] : "/";
    if ("string" != typeof c) {
      throw new TypeError("Arguments to path.resolve must be strings");
    }
    if (!c) {
      return "";
    }
    b = c + "/" + b;
    c = "/" === c.charAt(0);
  }
  b = Ia(b.split("/").filter(e => !!e), !c).join("/");
  return (c ? "/" : "") + b || ".";
}, Oa = [], Pa = a => {
  for (var b = 0, c = 0; c < a.length; ++c) {
    var d = a.charCodeAt(c);
    127 >= d ? b++ : 2047 >= d ? b += 2 : 55296 <= d && 57343 >= d ? (b += 4, ++c) : b += 3;
  }
  return b;
}, A = (a, b, c, d) => {
  if (!(0 < d)) {
    return 0;
  }
  var e = c;
  d = c + d - 1;
  for (var f = 0; f < a.length; ++f) {
    var g = a.codePointAt(f);
    if (127 >= g) {
      if (c >= d) {
        break;
      }
      b[c++] = g;
    } else if (2047 >= g) {
      if (c + 1 >= d) {
        break;
      }
      b[c++] = 192 | g >> 6;
      b[c++] = 128 | g & 63;
    } else if (65535 >= g) {
      if (c + 2 >= d) {
        break;
      }
      b[c++] = 224 | g >> 12;
      b[c++] = 128 | g >> 6 & 63;
      b[c++] = 128 | g & 63;
    } else {
      if (c + 3 >= d) {
        break;
      }
      b[c++] = 240 | g >> 18;
      b[c++] = 128 | g >> 12 & 63;
      b[c++] = 128 | g >> 6 & 63;
      b[c++] = 128 | g & 63;
      f++;
    }
  }
  b[c] = 0;
  return c - e;
}, Qa = a => {
  var b = Array(Pa(a) + 1);
  a = A(a, b, 0, b.length);
  b.length = a;
  return b;
}, Ra = [];
function Ta(a, b) {
  Ra[a] = {input:[], output:[], F:b};
  Ua(a, Va);
}
var Va = {open(a) {
  var b = Ra[a.node.rdev];
  if (!b) {
    throw new B(43);
  }
  a.tty = b;
  a.seekable = !1;
}, close(a) {
  a.tty.F.fsync(a.tty);
}, fsync(a) {
  a.tty.F.fsync(a.tty);
}, read(a, b, c, d) {
  if (!a.tty || !a.tty.F.La) {
    throw new B(60);
  }
  for (var e = 0, f = 0; f < d; f++) {
    try {
      var g = a.tty.F.La(a.tty);
    } catch (l) {
      throw new B(29);
    }
    if (void 0 === g && 0 === e) {
      throw new B(6);
    }
    if (null === g || void 0 === g) {
      break;
    }
    e++;
    b[c + f] = g;
  }
  e && (a.node.atime = Date.now());
  return e;
}, write(a, b, c, d) {
  if (!a.tty || !a.tty.F.ya) {
    throw new B(60);
  }
  try {
    for (var e = 0; e < d; e++) {
      a.tty.F.ya(a.tty, b[c + e]);
    }
  } catch (f) {
    throw new B(29);
  }
  d && (a.node.mtime = a.node.ctime = Date.now());
  return e;
}}, Wa = {La() {
  a: {
    if (!Oa.length) {
      var a = null;
      if (ca) {
        var b = Buffer.alloc(256), c = 0, d = process.stdin.fd;
        try {
          c = fs.readSync(d, b, 0, 256);
        } catch (e) {
          if (e.toString().includes("EOF")) {
            c = 0;
          } else {
            throw e;
          }
        }
        0 < c && (a = b.slice(0, c).toString("utf-8"));
      } else {
        globalThis.window?.prompt && (a = window.prompt("Input: "), null !== a && (a += "\n"));
      }
      if (!a) {
        a = null;
        break a;
      }
      Oa = Qa(a);
    }
    a = Oa.shift();
  }
  return a;
}, ya(a, b) {
  null === b || 10 === b ? (ma(y(a.output)), a.output = []) : 0 != b && a.output.push(b);
}, fsync(a) {
  0 < a.output?.length && (ma(y(a.output)), a.output = []);
}, hb() {
  return {zb:25856, Bb:5, yb:191, Ab:35387, xb:[3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]};
}, ib() {
  return 0;
}, jb() {
  return [24, 80];
}}, Xa = {ya(a, b) {
  null === b || 10 === b ? (k(y(a.output)), a.output = []) : 0 != b && a.output.push(b);
}, fsync(a) {
  0 < a.output?.length && (k(y(a.output)), a.output = []);
}}, D = {v:null, D() {
  return D.createNode(null, "/", 16895, 0);
}, createNode(a, b, c, d) {
  if (24576 === (c & 61440) || 4096 === (c & 61440)) {
    throw new B(63);
  }
  D.v || (D.v = {dir:{node:{K:D.h.K, A:D.h.A, lookup:D.h.lookup, $:D.h.$, rename:D.h.rename, unlink:D.h.unlink, rmdir:D.h.rmdir, readdir:D.h.readdir, symlink:D.h.symlink}, stream:{u:D.g.u}}, file:{node:{K:D.h.K, A:D.h.A}, stream:{u:D.g.u, read:D.g.read, write:D.g.write, aa:D.g.aa, fa:D.g.fa}}, link:{node:{K:D.h.K, A:D.h.A, readlink:D.h.readlink}, stream:{}}, Ia:{node:{K:D.h.K, A:D.h.A}, stream:Ya}});
  c = Za(a, b, c, d);
  16384 === (c.mode & 61440) ? (c.h = D.v.dir.node, c.g = D.v.dir.stream, c.i = {}) : 32768 === (c.mode & 61440) ? (c.h = D.v.file.node, c.g = D.v.file.stream, c.m = 0, c.i = D.ab ?? (D.ab = new Uint8Array(0))) : 40960 === (c.mode & 61440) ? (c.h = D.v.link.node, c.g = D.v.link.stream) : 8192 === (c.mode & 61440) && (c.h = D.v.Ia.node, c.g = D.v.Ia.stream);
  c.atime = c.mtime = c.ctime = Date.now();
  a && (a.i[b] = c, a.atime = a.mtime = a.ctime = c.atime);
  return c;
}, h:{K(a) {
  var b = {};
  b.dev = 8192 === (a.mode & 61440) ? a.id : 1;
  b.ino = a.id;
  b.mode = a.mode;
  b.nlink = 1;
  b.uid = 0;
  b.gid = 0;
  b.rdev = a.rdev;
  16384 === (a.mode & 61440) ? b.size = 4096 : 32768 === (a.mode & 61440) ? b.size = a.m : 40960 === (a.mode & 61440) ? b.size = a.link.length : b.size = 0;
  b.atime = new Date(a.atime);
  b.mtime = new Date(a.mtime);
  b.ctime = new Date(a.ctime);
  b.blksize = 4096;
  b.blocks = Math.ceil(b.size / b.blksize);
  return b;
}, A(a, b) {
  for (var c of ["mode", "atime", "mtime", "ctime"]) {
    null != b[c] && (a[c] = b[c]);
  }
  void 0 !== b.size && (b = b.size, a.m != b && (c = a.i, a.i = new Uint8Array(b), a.i.set(c.subarray(0, Math.min(b, a.m))), a.m = b));
}, lookup() {
  D.ma || (D.ma = new B(44), D.ma.stack = "<generic error, no stack>");
  throw D.ma;
}, $(a, b, c, d) {
  return D.createNode(a, b, c, d);
}, rename(a, b, c) {
  try {
    var d = $a(b, c);
  } catch (f) {
  }
  if (d) {
    if (16384 === (a.mode & 61440)) {
      for (var e in d.i) {
        throw new B(55);
      }
    }
    e = ab(d.parent.id, d.name);
    if (bb[e] === d) {
      bb[e] = d.N;
    } else {
      for (e = bb[e]; e;) {
        if (e.N === d) {
          e.N = d.N;
          break;
        }
        e = e.N;
      }
    }
  }
  delete a.parent.i[a.name];
  b.i[c] = a;
  a.name = c;
  b.ctime = b.mtime = a.parent.ctime = a.parent.mtime = Date.now();
}, unlink(a, b) {
  delete a.i[b];
  a.ctime = a.mtime = Date.now();
}, rmdir(a, b) {
  var c = $a(a, b), d;
  for (d in c.i) {
    throw new B(55);
  }
  delete a.i[b];
  a.ctime = a.mtime = Date.now();
}, readdir(a) {
  return [".", "..", ...Object.keys(a.i)];
}, symlink(a, b, c) {
  a = D.createNode(a, b, 41471, 0);
  a.link = c;
  return a;
}, readlink(a) {
  if (40960 !== (a.mode & 61440)) {
    throw new B(28);
  }
  return a.link;
}}, g:{read(a, b, c, d, e) {
  if (e >= a.node.m) {
    return 0;
  }
  d = Math.min(a.node.m - e, d);
  b.set(a.node.i.subarray(e, e + d), c);
  return d;
}, write(a, b, c, d, e, f) {
  if (!d) {
    return 0;
  }
  a = a.node;
  a.mtime = a.ctime = Date.now();
  if (f) {
    a.i = b.subarray(c, c + d), a.m = d;
  } else if (0 === a.m && 0 === e) {
    a.i = b.slice(c, c + d), a.m = d;
  } else {
    f = e + d;
    var g = a.i.length;
    g >= f || (f = Math.max(f, g * (1048576 > g ? 2.0 : 1.125) >>> 0), g && (f = Math.max(f, 256)), g = a.i.subarray(0, a.m), a.i = new Uint8Array(f), a.i.set(g));
    a.i.set(b.subarray(c, c + d), e);
    a.m = Math.max(a.m, e + d);
  }
  return d;
}, u(a, b, c) {
  1 === c ? b += a.position : 2 === c && 32768 === (a.node.mode & 61440) && (b += a.node.m);
  if (0 > b) {
    throw new B(28);
  }
  return b;
}, aa(a, b, c, d, e) {
  if (32768 !== (a.node.mode & 61440)) {
    throw new B(43);
  }
  a = a.node.i;
  if (e & 2 || a.buffer !== m.buffer) {
    e = !0;
    d = 65536 * Math.ceil(b / 65536);
    var f = cb(65536, d);
    f && n.fill(0, f, f + d);
    d = f;
    if (!d) {
      throw new B(48);
    }
    if (a) {
      if (0 < c || c + b < a.length) {
        a.subarray ? a = a.subarray(c, c + b) : a = Array.prototype.slice.call(a, c, c + b);
      }
      m.set(a, d);
    }
  } else {
    e = !1, d = a.byteOffset;
  }
  return {ob:d, Ya:e};
}, fa(a, b, c, d) {
  D.g.write(a, b, 0, d, c, !1);
  return 0;
}}}, db = (a, b) => {
  var c = 0;
  a && (c |= 365);
  b && (c |= 146);
  return c;
}, eb = [], fb = null, gb = {}, hb = [], ib = 1, bb = null, jb = !1, kb = !0, B = class {
  name="ErrnoError";
  constructor(a) {
    this.j = a;
  }
}, lb = class {
  J={};
  node=null;
  get flags() {
    return this.J.flags;
  }
  set flags(a) {
    this.J.flags = a;
  }
  get position() {
    return this.J.position;
  }
  set position(a) {
    this.J.position = a;
  }
}, mb = class {
  h={};
  g={};
  ba=null;
  constructor(a, b, c, d) {
    a ||= this;
    this.parent = a;
    this.D = a.D;
    this.id = ib++;
    this.name = b;
    this.mode = c;
    this.rdev = d;
    this.atime = this.mtime = this.ctime = Date.now();
  }
  get read() {
    return 365 === (this.mode & 365);
  }
  set read(a) {
    a ? this.mode |= 365 : this.mode &= -366;
  }
  get write() {
    return 146 === (this.mode & 146);
  }
  set write(a) {
    a ? this.mode |= 146 : this.mode &= -147;
  }
};
function nb(a, b = {}) {
  if (!a) {
    throw new B(44);
  }
  b.pa ?? (b.pa = !0);
  "/" === a.charAt(0) || (a = "//" + a);
  var c = 0;
  a: for (; 40 > c; c++) {
    a = a.split("/").filter(l => !!l);
    for (var d = fb, e = "/", f = 0; f < a.length; f++) {
      var g = f === a.length - 1;
      if (g && b.parent) {
        break;
      }
      if ("." !== a[f]) {
        if (".." === a[f]) {
          if (e = Ka(e), d === d.parent) {
            a = e + "/" + a.slice(f + 1).join("/");
            c--;
            continue a;
          } else {
            d = d.parent;
          }
        } else {
          e = Ja(e + "/" + a[f]);
          try {
            d = $a(d, a[f]);
          } catch (l) {
            if (44 === l?.j && g && b.mb) {
              return {path:e};
            }
            throw l;
          }
          !d.ba || g && !b.pa || (d = d.ba.root);
          if (40960 === (d.mode & 61440) && (!g || b.T)) {
            if (!d.h.readlink) {
              throw new B(52);
            }
            d = d.h.readlink(d);
            "/" === d.charAt(0) || (d = Ka(e) + "/" + d);
            a = d + "/" + a.slice(f + 1).join("/");
            continue a;
          }
        }
      }
    }
    return {path:e, node:d};
  }
  throw new B(32);
}
function ob(a) {
  for (var b;;) {
    if (a === a.parent) {
      return a = a.D.Oa, b ? "/" !== a[a.length - 1] ? `${a}/${b}` : a + b : a;
    }
    b = b ? `${a.name}/${b}` : a.name;
    a = a.parent;
  }
}
function ab(a, b) {
  for (var c = 0, d = 0; d < b.length; d++) {
    c = (c << 5) - c + b.charCodeAt(d) | 0;
  }
  return (a + c >>> 0) % bb.length;
}
function $a(a, b) {
  var c = 16384 === (a.mode & 61440) ? (c = pb(a, "x")) ? c : a.h.lookup ? 0 : 2 : 54;
  if (c) {
    throw new B(c);
  }
  for (c = bb[ab(a.id, b)]; c; c = c.N) {
    var d = c.name;
    if (c.parent.id === a.id && d === b) {
      return c;
    }
  }
  return a.h.lookup(a, b);
}
function Za(a, b, c, d) {
  a = new mb(a, b, c, d);
  b = ab(a.parent.id, a.name);
  a.N = bb[b];
  return bb[b] = a;
}
function pb(a, b) {
  return kb ? 0 : b.includes("r") && !(a.mode & 292) || b.includes("w") && !(a.mode & 146) || b.includes("x") && !(a.mode & 73) ? 2 : 0;
}
function qb(a, b) {
  if (16384 !== (a.mode & 61440)) {
    return 54;
  }
  try {
    return $a(a, b), 20;
  } catch (c) {
  }
  return pb(a, "wx");
}
function E(a) {
  a = hb[a];
  if (!a) {
    throw new B(8);
  }
  return a;
}
function rb(a, b = -1) {
  a = Object.assign(new lb(), a);
  if (-1 == b) {
    a: {
      for (b = 0; 4096 >= b; b++) {
        if (!hb[b]) {
          break a;
        }
      }
      throw new B(33);
    }
  }
  a.fd = b;
  return hb[b] = a;
}
function sb(a, b = -1) {
  a = rb(a, b);
  a.g?.Ib?.(a);
  return a;
}
function tb(a, b) {
  var c = null?.g.A, d = c ? null : a;
  c ??= a.h.A;
  if (!c) {
    throw new B(63);
  }
  c(d, b);
}
var Ya = {open(a) {
  a.g = gb[a.node.rdev].g;
  a.g.open?.(a);
}, u() {
  throw new B(70);
}};
function Ua(a, b) {
  gb[a] = {g:b};
}
function ub(a, b) {
  var c = "/" === b;
  if (c && fb) {
    throw new B(10);
  }
  if (!c && b) {
    var d = nb(b, {pa:!1});
    b = d.path;
    d = d.node;
    if (d.ba) {
      throw new B(10);
    }
    if (16384 !== (d.mode & 61440)) {
      throw new B(54);
    }
  }
  b = {type:a, Ob:{}, Oa:b, lb:[]};
  a = a.D(b);
  a.D = b;
  b.root = a;
  c ? fb = a : d && (d.ba = b, d.D && d.D.lb.push(b));
}
function vb(a, b, c) {
  var d = nb(a, {parent:!0}).node;
  a = a && a.match(/([^\/]+|\/)\/*$/)[1];
  if (!a) {
    throw new B(28);
  }
  if ("." === a || ".." === a) {
    throw new B(20);
  }
  var e = qb(d, a);
  if (e) {
    throw new B(e);
  }
  if (!d.h.$) {
    throw new B(63);
  }
  return d.h.$(d, a, b, c);
}
function F(a) {
  return vb(a, 16895, 0);
}
function wb(a, b, c) {
  "undefined" == typeof c && (c = b, b = 438);
  vb(a, b | 8192, c);
}
function xb(a, b) {
  if (!Na(a)) {
    throw new B(44);
  }
  var c = nb(b, {parent:!0}).node;
  if (!c) {
    throw new B(44);
  }
  b = b && b.match(/([^\/]+|\/)\/*$/)[1];
  var d = qb(c, b);
  if (d) {
    throw new B(d);
  }
  if (!c.h.symlink) {
    throw new B(63);
  }
  c.h.symlink(c, b, a);
}
function yb(a, b, c = 438) {
  if ("" === a) {
    throw new B(44);
  }
  if ("string" == typeof b) {
    var d = {r:0, "r+":2, w:577, "w+":578, a:1089, "a+":1090}[b];
    if ("undefined" == typeof d) {
      throw Error(`Unknown file open mode: ${b}`);
    }
    b = d;
  }
  c = b & 64 ? c & 4095 | 32768 : 0;
  if ("object" == typeof a) {
    d = a;
  } else {
    var e = a.endsWith("/");
    var f = nb(a, {T:!(b & 131072), mb:!0});
    d = f.node;
    a = f.path;
  }
  f = !1;
  if (b & 64) {
    if (d) {
      if (b & 128) {
        throw new B(20);
      }
    } else {
      if (e) {
        throw new B(31);
      }
      d = vb(a, c | 511, 0);
      f = !0;
    }
  }
  if (!d) {
    throw new B(44);
  }
  8192 === (d.mode & 61440) && (b &= -513);
  if (b & 65536 && 16384 !== (d.mode & 61440)) {
    throw new B(54);
  }
  if (!f && (d ? 40960 === (d.mode & 61440) ? e = 32 : (e = ["r", "w", "rw"][b & 3], b & 512 && (e += "w"), e = 16384 === (d.mode & 61440) && ("r" !== e || b & 576) ? 31 : pb(d, e)) : e = 44, e)) {
    throw new B(e);
  }
  if (b & 512 && !f) {
    e = d;
    e = "string" == typeof e ? nb(e, {T:!0}).node : e;
    if (16384 === (e.mode & 61440)) {
      throw new B(31);
    }
    if (32768 !== (e.mode & 61440)) {
      throw new B(28);
    }
    if (a = pb(e, "w")) {
      throw new B(a);
    }
    tb(e, {size:0, timestamp:Date.now()});
  }
  b = rb({node:d, path:ob(d), flags:b & -131713, seekable:!0, position:0, g:d.g, qb:[], error:!1});
  b.g.open && b.g.open(b);
  f && (c &= 511, d = "string" == typeof d ? nb(d, {T:!0}).node : d, tb(d, {mode:c & 4095 | d.mode & -4096, ctime:Date.now(), Hb:void 0}));
  return b;
}
function zb(a) {
  if (null === a.fd) {
    throw new B(8);
  }
  a.ua && (a.ua = null);
  try {
    a.g.close && a.g.close(a);
  } catch (b) {
    throw b;
  } finally {
    hb[a.fd] = null;
  }
  a.fd = null;
}
function Ab(a, b, c) {
  if (null === a.fd) {
    throw new B(8);
  }
  if (!a.seekable || !a.g.u) {
    throw new B(70);
  }
  if (0 != c && 1 != c && 2 != c) {
    throw new B(28);
  }
  a.position = a.g.u(a, b, c);
  a.qb = [];
}
function Bb(a, b, c, d, e, f) {
  if (0 > d || 0 > e) {
    throw new B(28);
  }
  if (null === a.fd) {
    throw new B(8);
  }
  if (0 === (a.flags & 2097155)) {
    throw new B(8);
  }
  if (16384 === (a.node.mode & 61440)) {
    throw new B(31);
  }
  if (!a.g.write) {
    throw new B(28);
  }
  a.seekable && a.flags & 1024 && Ab(a, 0, 2);
  var g = "undefined" != typeof e;
  if (!g) {
    e = a.position;
  } else if (!a.seekable) {
    throw new B(70);
  }
  b = a.g.write(a, b, c, d, e, f);
  g || (a.position += b);
  return b;
}
function Cb(a, b) {
  a = "string" == typeof a ? a : ob(a);
  for (b = b.split("/").reverse(); b.length;) {
    var c = b.pop();
    if (c) {
      a = Ja(a + "/" + c);
      try {
        F(a);
      } catch (d) {
        if (20 != d.j) {
          throw d;
        }
      }
    }
  }
}
function Db(a, b, c) {
  a = Ja("/dev/" + a);
  var d = db(!!b, !!c);
  Db.Na ?? (Db.Na = 64);
  var e = Db.Na++ << 8 | 0;
  Ua(e, {open(f) {
    f.seekable = !1;
  }, close() {
    c?.buffer?.length && c(10);
  }, read(f, g, l, p) {
    for (var q = 0, u = 0; u < p; u++) {
      try {
        var z = b();
      } catch (x) {
        throw new B(29);
      }
      if (void 0 === z && 0 === q) {
        throw new B(6);
      }
      if (null === z || void 0 === z) {
        break;
      }
      q++;
      g[l + u] = z;
    }
    q && (f.node.atime = Date.now());
    return q;
  }, write(f, g, l, p) {
    for (var q = 0; q < p; q++) {
      try {
        c(g[l + q]);
      } catch (u) {
        throw new B(29);
      }
    }
    p && (f.node.mtime = f.node.ctime = Date.now());
    return q;
  }});
  wb(a, d, e);
}
var H = {};
function Eb(a, b) {
  if ("/" === b.charAt(0)) {
    return b;
  }
  a = -100 === a ? "/" : E(a).path;
  if (0 == b.length) {
    throw new B(44);
  }
  return a + "/" + b;
}
var Fb = void 0, I = () => {
  var a = r[+Fb >> 2];
  Fb += 4;
  return a;
}, Gb = 0, Hb = [], Ib = (a, b) => {
  Hb.length = 0;
  for (var c; c = n[a++];) {
    var d = 105 != c;
    d &= 112 != c;
    b += d && b % 8 ? 4 : 0;
    Hb.push(112 == c ? t[b >> 2] : 106 == c ? ta[b >> 3] : 105 == c ? r[b >> 2] : w[b >> 3]);
    b += d ? 8 : 4;
  }
  return Hb;
}, Jb = [0, globalThis.document ?? 0, globalThis.window ?? 0], J = a => {
  a = 2 < a ? a ? y(n, a) : "" : a;
  return Jb[a] || globalThis.document?.querySelector(a);
}, Kb = a => 0 > Jb.indexOf(a) ? a.getBoundingClientRect() : {left:0, top:0};
function Lb(a) {
  var b = K.l[a];
  b.target.removeEventListener(b.o, b.Ja, b.G);
  K.l.splice(a, 1);
}
function Mb() {
  if (navigator.userActivation ? navigator.userActivation.isActive : K.wa && K.Za.la) {
    var a = K.I;
    K.I = [];
    for (var b of a) {
      b.Ba(...b.Ha);
    }
  }
}
function Nb(a) {
  if (!a.target) {
    return -4;
  }
  if (a.s) {
    a.Ja = function(c) {
      ++K.wa;
      K.Za = a;
      Mb();
      a.L(c);
      Mb();
      --K.wa;
    }, a.target.addEventListener(a.o, a.Ja, a.G), K.l.push(a);
  } else {
    for (var b = 0; b < K.l.length; ++b) {
      K.l[b].target == a.target && K.l[b].o == a.o && Lb(b--);
    }
  }
  return 0;
}
function Ob(a) {
  return a ? a == window ? "#window" : a == screen ? "#screen" : a?.nodeName || "" : "";
}
var K = {vb:0, ta:0, Mb:0, ea:0, $b:0, Da:0, oa:0, Gb:0, Pb:0, Fb:0, sa:0, xa:0, Fa:0, Ca:0, Sb() {
  for (; K.l.length;) {
    Lb(K.l.length - 1);
  }
  K.I = [];
}, wa:0, I:[], Eb(a, b, c) {
  function d(f, g) {
    if (f.length != g.length) {
      return !1;
    }
    for (var l in f) {
      if (f[l] != g[l]) {
        return !1;
      }
    }
    return !0;
  }
  for (var e of K.I) {
    if (e.Ba == a && d(e.Ha, c)) {
      return;
    }
  }
  K.I.push({Ba:a, Qa:b, Ha:c});
  K.I.sort((f, g) => f.Qa < g.Qa);
}, Ub(a) {
  K.I = K.I.filter(b => b.Ba != a);
}, l:[], Tb:(a, b) => {
  for (var c = 0; c < K.l.length; ++c) {
    K.l[c].target != a || b && b != K.l[c].o || Lb(c--);
  }
}, Vb(a) {
  let b = !1;
  for (let c = 0; c < K.l.length; ++c) {
    const d = K.l[c];
    d.target === a.target && d.C === a.C && d.s === a.s && d.H === a.H && (Lb(c--), b = !0);
  }
  return b ? 0 : -5;
}, fullscreenEnabled() {
  return document.fullscreenEnabled || document.webkitFullscreenEnabled;
}}, Pb = (a, b) => {
  w[a >> 3] = b.timestamp;
  for (var c = 0; c < b.axes.length; ++c) {
    w[a + 8 * c + 16 >> 3] = b.axes[c];
  }
  for (c = 0; c < b.buttons.length; ++c) {
    w[a + 8 * c + 528 >> 3] = "object" == typeof b.buttons[c] ? b.buttons[c].value : b.buttons[c];
  }
  for (c = 0; c < b.buttons.length; ++c) {
    m[a + c + 1040] = "object" == typeof b.buttons[c] ? b.buttons[c].pressed : 1 == b.buttons[c];
  }
  m[a + 1104] = b.connected;
  r[a + 1108 >> 2] = b.index;
  r[a + 8 >> 2] = b.axes.length;
  r[a + 12 >> 2] = b.buttons.length;
  A(b.id, n, a + 1112, 64);
  A(b.mapping, n, a + 1176, 64);
}, L, Qb = a => {
  var b = a.getExtension("ANGLE_instanced_arrays");
  b && (a.vertexAttribDivisor = (c, d) => b.vertexAttribDivisorANGLE(c, d), a.drawArraysInstanced = (c, d, e, f) => b.drawArraysInstancedANGLE(c, d, e, f), a.drawElementsInstanced = (c, d, e, f, g) => b.drawElementsInstancedANGLE(c, d, e, f, g));
}, Rb = a => {
  var b = a.getExtension("OES_vertex_array_object");
  b && (a.createVertexArray = () => b.createVertexArrayOES(), a.deleteVertexArray = c => b.deleteVertexArrayOES(c), a.bindVertexArray = c => b.bindVertexArrayOES(c), a.isVertexArray = c => b.isVertexArrayOES(c));
}, Sb = a => {
  var b = a.getExtension("WEBGL_draw_buffers");
  b && (a.drawBuffers = (c, d) => b.drawBuffersWEBGL(c, d));
}, Tb = a => {
  var b = "ANGLE_instanced_arrays EXT_blend_minmax EXT_disjoint_timer_query EXT_frag_depth EXT_shader_texture_lod EXT_sRGB OES_element_index_uint OES_fbo_render_mipmap OES_standard_derivatives OES_texture_float OES_texture_half_float OES_texture_half_float_linear OES_vertex_array_object WEBGL_color_buffer_float WEBGL_depth_texture WEBGL_draw_buffers EXT_clip_control EXT_color_buffer_half_float EXT_depth_clamp EXT_float_blend EXT_polygon_offset_clamp EXT_texture_compression_bptc EXT_texture_compression_rgtc EXT_texture_filter_anisotropic KHR_parallel_shader_compile OES_texture_float_linear WEBGL_blend_func_extended WEBGL_compressed_texture_astc WEBGL_compressed_texture_etc WEBGL_compressed_texture_etc1 WEBGL_compressed_texture_s3tc WEBGL_compressed_texture_s3tc_srgb WEBGL_debug_renderer_info WEBGL_debug_shaders WEBGL_lose_context WEBGL_multi_draw WEBGL_polygon_mode".split(" ");
  return (a.getSupportedExtensions() || []).filter(c => b.includes(c));
}, Ub = 1, Vb = [], N = [], Wb = [], Xb = [], Yb = [], O = [], Zb = [], $b = [], P = [], ac = {}, bc = 4, cc = 0, dc = a => {
  for (var b = Ub++, c = a.length; c < b; c++) {
    a[c] = null;
  }
  return b;
}, ec = (a, b, c, d) => {
  for (var e = 0; e < a; e++) {
    var f = L[c](), g = f && dc(d);
    f ? (f.name = g, d[g] = f) : Q ||= 1282;
    r[b + 4 * e >> 2] = g;
  }
}, gc = (a, b) => {
  a.J || (a.J = a.getContext, a.getContext = function(d, e) {
    e = a.J(d, e);
    return "webgl" == d == e instanceof WebGLRenderingContext ? e : null;
  });
  var c = a.getContext("webgl", b);
  return c ? fc(c, b) : 0;
}, fc = (a, b) => {
  var c = dc($b), d = {handle:c, attributes:b, version:b.kb, ka:a};
  a.canvas && (a.canvas.sb = d);
  $b[c] = d;
  if ("undefined" == typeof b.bb || b.bb) {
    if ((a = d) || (a = hc), !a.fb) {
      a.fb = !0;
      a = a.ka;
      a.Nb = a.getExtension("WEBGL_multi_draw");
      a.eb = a.getExtension("EXT_polygon_offset_clamp");
      a.cb = a.getExtension("EXT_clip_control");
      a.rb = a.getExtension("WEBGL_polygon_mode");
      Qb(a);
      Rb(a);
      Sb(a);
      a.B = a.getExtension("EXT_disjoint_timer_query");
      for (var e of Tb(a)) {
        e.includes("lose_context") || e.includes("debug") || a.getExtension(e);
      }
    }
  }
  return c;
}, ic = {}, Q, hc, jc = a => L.activeTexture(a), kc = (a, b) => {
  L.attachShader(N[a], O[b]);
}, lc = (a, b, c) => {
  L.bindAttribLocation(N[a], b, c ? y(n, c) : "");
}, mc = (a, b) => {
  L.bindBuffer(a, Vb[b]);
}, nc = (a, b) => {
  L.bindTexture(a, Yb[b]);
}, oc = (a, b) => L.blendFunc(a, b), pc = (a, b, c, d) => {
  L.bufferData(a, c ? n.subarray(c, c + b) : b, d);
}, qc = (a, b, c, d) => {
  L.bufferSubData(a, b, n.subarray(d, d + c));
}, rc = a => L.clear(a), sc = (a, b, c, d) => L.clearColor(a, b, c, d), tc = a => L.clearDepth(a), uc = a => {
  L.compileShader(O[a]);
}, vc = (a, b, c, d, e, f, g, l) => {
  L.compressedTexImage2D(a, b, c, d, e, f, n.subarray(l, l + g));
}, wc = () => {
  var a = dc(N), b = L.createProgram();
  b.name = a;
  b.Z = b.X = b.Y = 0;
  b.Ea = 1;
  N[a] = b;
  return a;
}, xc = a => {
  var b = dc(O);
  O[b] = L.createShader(a);
  return b;
}, yc = a => L.cullFace(a), zc = (a, b) => {
  for (var c = 0; c < a; c++) {
    var d = r[b + 4 * c >> 2], e = Vb[d];
    e && (L.deleteBuffer(e), e.name = 0, Vb[d] = null);
  }
}, Ac = a => {
  if (a) {
    var b = N[a];
    b ? (L.deleteProgram(b), b.name = 0, N[a] = null) : Q ||= 1281;
  }
}, Bc = a => {
  if (a) {
    var b = O[a];
    b ? (L.deleteShader(b), O[a] = null) : Q ||= 1281;
  }
}, Cc = (a, b) => {
  for (var c = 0; c < a; c++) {
    var d = r[b + 4 * c >> 2], e = Yb[d];
    e && (L.deleteTexture(e), e.name = 0, Yb[d] = null);
  }
}, Dc = a => L.depthFunc(a), Ec = (a, b) => {
  L.detachShader(N[a], O[b]);
}, Fc = a => L.disable(a), Gc = a => {
  L.disableVertexAttribArray(a);
}, Hc = (a, b, c) => {
  L.drawArrays(a, b, c);
}, Ic = [], Jc = (a, b, c, d) => {
  L.drawElements(a, b, c, d);
}, Kc = a => L.enable(a), Lc = a => {
  L.enableVertexAttribArray(a);
}, Mc = a => L.frontFace(a), Nc = (a, b) => {
  ec(a, b, "createBuffer", Vb);
}, Oc = (a, b) => {
  ec(a, b, "createTexture", Yb);
}, Pc = (a, b, c, d, e, f, g, l) => {
  b = N[b];
  if (a = L[a](b, c)) {
    d = l && A(a.name, n, l, d), e && (r[e >> 2] = d), f && (r[f >> 2] = a.size), g && (r[g >> 2] = a.type);
  }
}, Qc = (a, b) => L.getAttribLocation(N[a], b ? y(n, b) : ""), Rc = (a, b, c) => {
  if (b) {
    var d = void 0;
    switch(a) {
      case 36346:
        d = 1;
        break;
      case 36344:
        0 != c && 1 != c && (Q ||= 1280);
        return;
      case 36345:
        d = 0;
        break;
      case 34466:
        var e = L.getParameter(34467);
        d = e ? e.length : 0;
    }
    if (void 0 === d) {
      switch(e = L.getParameter(a), typeof e) {
        case "number":
          d = e;
          break;
        case "boolean":
          d = e ? 1 : 0;
          break;
        case "string":
          Q ||= 1280;
          return;
        case "object":
          if (null === e) {
            switch(a) {
              case 34964:
              case 35725:
              case 34965:
              case 36006:
              case 36007:
              case 32873:
              case 34229:
              case 34068:
                d = 0;
                break;
              default:
                Q ||= 1280;
                return;
            }
          } else {
            if (e instanceof Float32Array || e instanceof Uint32Array || e instanceof Int32Array || e instanceof Array) {
              for (a = 0; a < e.length; ++a) {
                switch(c) {
                  case 0:
                    r[b + 4 * a >> 2] = e[a];
                    break;
                  case 2:
                    v[b + 4 * a >> 2] = e[a];
                    break;
                  case 4:
                    m[b + a] = e[a] ? 1 : 0;
                }
              }
              return;
            }
            try {
              d = e.name | 0;
            } catch (f) {
              Q ||= 1280;
              k(`GL_INVALID_ENUM in glGet${c}v: Unknown object returned from WebGL getParameter(${a})! (error: ${f})`);
              return;
            }
          }
          break;
        default:
          Q ||= 1280;
          k(`GL_INVALID_ENUM in glGet${c}v: Native code calling glGet${c}v(${a}) and it returns ${e} of type ${typeof e}!`);
          return;
      }
    }
    switch(c) {
      case 1:
        c = d;
        t[b >> 2] = c;
        t[b + 4 >> 2] = (c - t[b >> 2]) / 4294967296;
        break;
      case 0:
        r[b >> 2] = d;
        break;
      case 2:
        v[b >> 2] = d;
        break;
      case 4:
        m[b] = d ? 1 : 0;
    }
  } else {
    Q ||= 1281;
  }
}, Sc = (a, b) => Rc(a, b, 2), Tc = (a, b, c, d) => {
  a = L.getProgramInfoLog(N[a]);
  null === a && (a = "(unknown error)");
  b = 0 < b && d ? A(a, n, d, b) : 0;
  c && (r[c >> 2] = b);
}, Uc = (a, b, c) => {
  if (c) {
    if (a >= Ub) {
      Q ||= 1281;
    } else {
      if (a = N[a], 35716 == b) {
        a = L.getProgramInfoLog(a), null === a && (a = "(unknown error)"), r[c >> 2] = a.length + 1;
      } else if (35719 == b) {
        if (!a.Z) {
          var d = L.getProgramParameter(a, 35718);
          for (b = 0; b < d; ++b) {
            a.Z = Math.max(a.Z, L.getActiveUniform(a, b).name.length + 1);
          }
        }
        r[c >> 2] = a.Z;
      } else if (35722 == b) {
        if (!a.X) {
          for (d = L.getProgramParameter(a, 35721), b = 0; b < d; ++b) {
            a.X = Math.max(a.X, L.getActiveAttrib(a, b).name.length + 1);
          }
        }
        r[c >> 2] = a.X;
      } else if (35381 == b) {
        if (!a.Y) {
          for (d = L.getProgramParameter(a, 35382), b = 0; b < d; ++b) {
            a.Y = Math.max(a.Y, L.getActiveUniformBlockName(a, b).length + 1);
          }
        }
        r[c >> 2] = a.Y;
      } else {
        r[c >> 2] = L.getProgramParameter(a, b);
      }
    }
  } else {
    Q ||= 1281;
  }
}, Vc = (a, b, c) => {
  if (c) {
    a = L.B.getQueryObjectEXT(P[a], b);
    var d;
    "boolean" == typeof a ? d = a ? 1 : 0 : d = a;
    t[c >> 2] = d;
    t[c + 4 >> 2] = (d - t[c >> 2]) / 4294967296;
  } else {
    Q ||= 1281;
  }
}, Wc = (a, b, c) => {
  if (c) {
    a = L.B.getQueryObjectEXT(P[a], b);
    var d;
    "boolean" == typeof a ? d = a ? 1 : 0 : d = a;
    r[c >> 2] = d;
  } else {
    Q ||= 1281;
  }
}, Xc = (a, b, c, d) => {
  a = L.getShaderInfoLog(O[a]);
  null === a && (a = "(unknown error)");
  b = 0 < b && d ? A(a, n, d, b) : 0;
  c && (r[c >> 2] = b);
}, Yc = (a, b, c) => {
  c ? 35716 == b ? (a = L.getShaderInfoLog(O[a]), null === a && (a = "(unknown error)"), r[c >> 2] = a ? a.length + 1 : 0) : 35720 == b ? (a = L.getShaderSource(O[a]), r[c >> 2] = a ? a.length + 1 : 0) : r[c >> 2] = L.getShaderParameter(O[a], b) : Q ||= 1281;
}, Zc = a => {
  var b = Pa(a) + 1, c = R(b);
  c && A(a, n, c, b);
  return c;
}, $c = () => {
  var a = Tb(L);
  return a = a.concat(a.map(b => "GL_" + b));
}, ad = a => {
  var b = ac[a];
  if (!b) {
    switch(a) {
      case 7939:
        b = Zc($c().join(" "));
        break;
      case 7936:
      case 7937:
      case 37445:
      case 37446:
        (b = L.getParameter(a)) || (Q ||= 1280);
        b = b ? Zc(b) : 0;
        break;
      case 7938:
        b = Zc(`OpenGL ES 2.0 (${L.getParameter(7938)})`);
        break;
      case 35724:
        b = L.getParameter(35724);
        var c = b.match(/^WebGL GLSL ES ([0-9]\.[0-9][0-9]?)(?:$| .*)/);
        null !== c && (3 == c[1].length && (c[1] += "0"), b = `OpenGL ES GLSL ES ${c[1]} (${b})`);
        b = Zc(b);
        break;
      default:
        Q ||= 1280;
    }
    ac[a] = b;
  }
  return b;
}, bd = a => "]" == a.slice(-1) && a.lastIndexOf("["), cd = a => {
  var b = a.R, c = a.Ua, d;
  if (!b) {
    a.R = b = {};
    a.Ta = {};
    var e = L.getProgramParameter(a, 35718);
    for (d = 0; d < e; ++d) {
      var f = L.getActiveUniform(a, d);
      var g = f.name;
      f = f.size;
      var l = bd(g);
      l = 0 < l ? g.slice(0, l) : g;
      var p = a.Ea;
      a.Ea += f;
      c[l] = [f, p];
      for (g = 0; g < f; ++g) {
        b[p] = g, a.Ta[p++] = l;
      }
    }
  }
}, dd = (a, b) => {
  b = b ? y(n, b) : "";
  if (a = N[a]) {
    cd(a);
    var c = a.R, d = 0, e = b, f = bd(b);
    0 < f && (d = parseInt(b.slice(f + 1)) >>> 0, e = b.slice(0, f));
    if ((e = a.Ua[e]) && d < e[0] && (d += e[1], c[d] = c[d] || L.getUniformLocation(a, b))) {
      return d;
    }
  } else {
    Q ||= 1281;
  }
  return -1;
}, S = a => {
  var b = L.$a;
  if (b) {
    var c = b.R[a];
    "number" == typeof c && (b.R[a] = c = L.getUniformLocation(b, b.Ta[a] + (0 < c ? `[${c}]` : "")));
    return c;
  }
  Q ||= 1282;
}, ed = (a, b, c, d) => {
  if (c) {
    if (a = N[a], cd(a), a = L.getUniform(a, S(b)), "number" == typeof a || "boolean" == typeof a) {
      switch(d) {
        case 0:
          r[c >> 2] = a;
          break;
        case 2:
          v[c >> 2] = a;
      }
    } else {
      for (b = 0; b < a.length; b++) {
        switch(d) {
          case 0:
            r[c + 4 * b >> 2] = a[b];
            break;
          case 2:
            v[c + 4 * b >> 2] = a[b];
        }
      }
    }
  } else {
    Q ||= 1281;
  }
}, fd = (a, b, c, d) => {
  if (c) {
    if (a = L.getVertexAttrib(a, b), 34975 == b) {
      r[c >> 2] = a && a.name;
    } else if ("number" == typeof a || "boolean" == typeof a) {
      switch(d) {
        case 0:
          r[c >> 2] = a;
          break;
        case 2:
          v[c >> 2] = a;
          break;
        case 5:
          r[c >> 2] = Math.fround(a);
      }
    } else {
      for (b = 0; b < a.length; b++) {
        switch(d) {
          case 0:
            r[c + 4 * b >> 2] = a[b];
            break;
          case 2:
            v[c + 4 * b >> 2] = a[b];
            break;
          case 5:
            r[c + 4 * b >> 2] = Math.fround(a[b]);
        }
      }
    }
  } else {
    Q ||= 1281;
  }
}, gd = a => {
  a = N[a];
  L.linkProgram(a);
  a.R = 0;
  a.Ua = {};
}, hd = (a, b) => {
  3317 == a ? bc = b : 3314 == a && (cc = b);
  L.pixelStorei(a, b);
}, jd = (a, b, c, d, e) => {
  a -= 5120;
  a = 1 == a ? n : 4 == a ? r : 6 == a ? v : 5 == a || 28922 == a ? t : sa;
  b = d * ((cc || c) * ({5:3, 6:4, 8:2, 29502:3, 29504:4}[b - 6402] || 1) * a.BYTES_PER_ELEMENT + bc - 1 & -bc);
  return a.subarray(e >>> 31 - Math.clz32(a.BYTES_PER_ELEMENT), e + b >>> 31 - Math.clz32(a.BYTES_PER_ELEMENT));
}, kd = (a, b, c, d, e, f, g) => {
  (g = jd(f, e, c, d, g)) ? L.readPixels(a, b, c, d, e, f, g) : Q ||= 1280;
}, ld = (a, b, c, d) => {
  for (var e = "", f = 0; f < b; ++f) {
    var g = (g = t[c + 4 * f >> 2]) ? y(n, g, d ? t[d + 4 * f >> 2] : void 0) : "";
    e += g;
  }
  L.shaderSource(O[a], e);
}, md = (a, b, c, d, e, f, g, l, p) => {
  p = p ? jd(l, g, d, e, p) : null;
  L.texImage2D(a, b, c, d, e, f, g, l, p);
}, nd = (a, b, c) => L.texParameteri(a, b, c), od = [], pd = (a, b) => {
  L.uniform1i(S(a), b);
}, qd = [], rd = (a, b, c, d, e) => {
  L.uniform4f(S(a), b, c, d, e);
}, sd = (a, b, c, d) => {
  if (18 >= b) {
    var e = od[16 * b], f = v;
    d >>= 2;
    b *= 16;
    for (var g = 0; g < b; g += 16) {
      var l = d + g;
      e[g] = f[l];
      e[g + 1] = f[l + 1];
      e[g + 2] = f[l + 2];
      e[g + 3] = f[l + 3];
      e[g + 4] = f[l + 4];
      e[g + 5] = f[l + 5];
      e[g + 6] = f[l + 6];
      e[g + 7] = f[l + 7];
      e[g + 8] = f[l + 8];
      e[g + 9] = f[l + 9];
      e[g + 10] = f[l + 10];
      e[g + 11] = f[l + 11];
      e[g + 12] = f[l + 12];
      e[g + 13] = f[l + 13];
      e[g + 14] = f[l + 14];
      e[g + 15] = f[l + 15];
    }
  } else {
    e = v.subarray(d >> 2, d + 64 * b >> 2);
  }
  L.uniformMatrix4fv(S(a), !!c, e);
}, td = a => {
  a = N[a];
  L.useProgram(a);
  L.$a = a;
}, ud = (a, b, c, d, e, f) => {
  L.vertexAttribPointer(a, b, c, !!d, e, f);
}, vd = (a, b, c, d) => L.viewport(a, b, c, d), wd = () => {
  try {
    if (navigator.getGamepads) {
      return (K.W = navigator.getGamepads()) ? 0 : -1;
    }
  } catch (a) {
    navigator.getGamepads = null;
  }
  return -1;
}, xd = (a, b, c, d, e, f) => {
  K.oa || (K.oa = R(256));
  a = {target:J(a), o:f, C:e, H:b, s:d, L:g => {
    var l = g.target.id ? g.target.id : "", p = K.oa;
    A(Ob(g.target), n, p + 0, 128);
    A(l, n, p + 128, 128);
    U(d, e, p, b) && g.preventDefault();
  }, G:c};
  return Nb(a);
}, yd = (a, b, c, d, e, f) => {
  K.ea || (K.ea = R(64));
  a = J(a);
  return Nb({target:a, la:"mousemove" != f && "mouseenter" != f && "mouseleave" != f, o:f, C:e, H:b, s:d, L:g => {
    var l = a, p = K.ea;
    w[p >> 3] = g.timeStamp;
    var q = p >> 2;
    r[q + 2] = g.screenX;
    r[q + 3] = g.screenY;
    r[q + 4] = g.clientX;
    r[q + 5] = g.clientY;
    m[p + 24] = g.ctrlKey;
    m[p + 25] = g.shiftKey;
    m[p + 26] = g.altKey;
    m[p + 27] = g.metaKey;
    ra[2 * q + 14] = g.button;
    ra[2 * q + 15] = g.buttons;
    r[q + 8] = g.movementX;
    r[q + 9] = g.movementY;
    l = Kb(l);
    r[q + 10] = g.clientX - (l.left | 0);
    r[q + 11] = g.clientY - (l.top | 0);
    U(d, e, K.ea, b) && g.preventDefault();
  }, G:c});
};
function zd() {
  return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.webkitCurrentFullScreenElement || document.msFullscreenElement;
}
var Ad = (a, b, c, d, e) => {
  K.sa || (K.sa = R(276));
  return Nb({target:a, o:e, C:19, H:b, s:d, L:f => {
    var g = K.sa, l = zd(), p = !!l;
    m[g] = p;
    m[g + 1] = K.fullscreenEnabled();
    var q = p ? l : K.nb, u = q?.id || "";
    A(Ob(q), n, g + 2, 128);
    A(u, n, g + 130, 128);
    r[g + 260 >> 2] = q ? q.clientWidth : 0;
    r[g + 264 >> 2] = q ? q.clientHeight : 0;
    r[g + 268 >> 2] = screen.width;
    r[g + 272 >> 2] = screen.height;
    p && (K.nb = l);
    U(d, 19, g, b) && f.preventDefault();
  }, G:c});
}, Bd = (a, b, c, d, e) => {
  K.ta || (K.ta = R(1240));
  b = {target:J(2), la:!0, o:e, C:d, H:a, s:c, L:f => {
    var g = K.ta;
    Pb(g, f.gamepad);
    U(c, d, g, a) && f.preventDefault();
  }, G:b};
  return Nb(b);
}, Cd = a => {
  a instanceof za || "unwind" == a || fa(1, a);
}, Dd = a => {
  qa = a;
  Ga || 0 < Gb || (h.onExit?.(a), oa = !0);
  fa(a, new za(a));
}, Ed = () => {
  if (!(Ga || 0 < Gb)) {
    try {
      var a = qa;
      qa = a;
      Dd(a);
    } catch (b) {
      Cd(b);
    }
  }
}, Fd = a => {
  if (!oa) {
    try {
      a();
    } catch (b) {
      Cd(b);
    } finally {
      Ed();
    }
  }
}, Pd = (a, b) => {
  Gd = a;
  Hd = b;
  if (Id) {
    if (Jd ||= !0, 0 == a) {
      Kd = function() {
        setTimeout(Ld, Math.max(0, Md + b - performance.now()) | 0);
      };
    } else if (1 == a) {
      Kd = function() {
        Nd(Ld);
      };
    } else {
      if (!Od) {
        if (globalThis.setImmediate) {
          Od = setImmediate;
        } else {
          var c = [];
          addEventListener("message", d => {
            if ("setimmediate" === d.data || "setimmediate" === d.data.target) {
              d.stopPropagation(), c.shift()();
            }
          }, !0);
          Od = d => {
            c.push(d);
            if (ba) {
              let e;
              (e = h).setImmediates ?? (e.setImmediates = []);
              h.setImmediates.push(d);
              postMessage({target:"setimmediate"});
            } else {
              postMessage("setimmediate", "*");
            }
          };
        }
      }
      Kd = function() {
        Od(Ld);
      };
    }
  }
}, Jd = !1, Kd = null, Qd = 0, Id = null, Rd = 0, Gd = 0, Hd = 0, Sd = 0, Td = [], Ud = [], Vd = [], Wd = 0;
function Nd(a) {
  if (globalThis.requestAnimationFrame) {
    requestAnimationFrame(a);
  } else {
    var b = Date.now();
    if (0 === Wd) {
      Wd = b + 1000 / 60;
    } else {
      for (; b + 2 >= Wd;) {
        Wd += 1000 / 60;
      }
    }
    setTimeout(a, Math.max(Wd - b, 0));
  }
}
var Xd = {}, Md, Ld, Od, Yd, Zd = (a, b, c, d, e) => {
  function f() {
    return g < Qd ? (Ed(), !1) : !0;
  }
  Id = a;
  Rd = d;
  var g = Qd;
  Jd = !1;
  Ld = function() {
    if (!oa) {
      if (0 < Td.length) {
        var l = Td.shift();
        l.Kb(l.tb);
        if (Yd) {
          var p = Yd, q = 0 == p % 1 ? p - 1 : Math.floor(p);
          Yd = l.Db ? q : (8 * p + (q + 0.5)) / 9;
        }
        h.setStatus && (l = h.statusMessage || "Please wait...", p = Yd ?? 0, q = Xd.Jb ?? 0, p ? p < q ? h.setStatus("{message} ({expected - remaining}/{expected})") : h.setStatus(l) : h.setStatus(""));
        f() && setTimeout(Ld, 0);
      } else {
        if (f()) {
          if (Sd = Sd + 1 | 0, 1 == Gd && 1 < Hd && 0 != Sd % Hd) {
            Kd();
          } else {
            0 == Gd && (Md = performance.now());
            a: {
              if (!oa) {
                for (l of Ud) {
                  if (!1 === l()) {
                    break a;
                  }
                }
                Fd(a);
                for (p of Vd) {
                  p();
                }
              }
            }
            f() && Kd();
          }
        }
      }
    }
  };
  e || (0 < b ? Pd(0, 1000.0 / b) : Pd(1, 1), Kd());
  if (c) {
    throw "unwind";
  }
}, $d = (a, b, c, d) => {
  K.xa || (K.xa = R(257));
  return Nb({target:a, o:"pointerlockchange", C:20, H:b, s:d, L:e => {
    var f = K.xa, g = document.pointerLockElement;
    m[f] = !!g;
    var l = g?.id || "";
    A(Ob(g), n, f + 1, 128);
    A(l, n, f + 129, 128);
    U(d, 20, f, b) && e.preventDefault();
  }, G:c});
}, ae = (a, b, c, d) => {
  K.Da || (K.Da = R(36));
  a = J(a);
  return Nb({target:a, o:"resize", C:10, H:b, s:d, L:e => {
    if (e.target == a) {
      var f = document.body;
      if (f) {
        var g = K.Da;
        r[g >> 2] = 0;
        r[g + 4 >> 2] = f.clientWidth;
        r[g + 8 >> 2] = f.clientHeight;
        r[g + 12 >> 2] = innerWidth;
        r[g + 16 >> 2] = innerHeight;
        r[g + 20 >> 2] = outerWidth;
        r[g + 24 >> 2] = outerHeight;
        r[g + 28 >> 2] = pageXOffset | 0;
        r[g + 32 >> 2] = pageYOffset | 0;
        U(d, 10, g, b) && e.preventDefault();
      }
    }
  }, G:c});
}, be = (a, b, c, d, e, f) => {
  K.Ca || (K.Ca = R(1552));
  a = J(a);
  return Nb({target:a, la:"touchstart" == f || "touchend" == f, o:f, C:e, H:b, s:d, L:g => {
    var l = {}, p = g.touches;
    for (var q of p) {
      q.Ma = q.Pa = 0, l[q.identifier] = q;
    }
    for (var u of g.changedTouches) {
      u.Ma = 1, l[u.identifier] = u;
    }
    for (var z of g.targetTouches) {
      l[z.identifier].Pa = 1;
    }
    p = K.Ca;
    w[p >> 3] = g.timeStamp;
    m[p + 12] = g.ctrlKey;
    m[p + 13] = g.shiftKey;
    m[p + 14] = g.altKey;
    m[p + 15] = g.metaKey;
    q = p + 16;
    u = Kb(a);
    z = 0;
    for (let x of Object.values(l)) {
      if (l = q >> 2, r[l] = x.identifier, r[l + 1] = x.screenX, r[l + 2] = x.screenY, r[l + 3] = x.clientX, r[l + 4] = x.clientY, r[l + 5] = x.pageX, r[l + 6] = x.pageY, m[q + 28] = x.Ma, m[q + 29] = x.Pa, r[l + 8] = x.clientX - (u.left | 0), r[l + 9] = x.clientY - (u.top | 0), q += 48, 31 < ++z) {
        break;
      }
    }
    r[p + 8 >> 2] = z;
    U(d, e, p, b) && g.preventDefault();
  }, G:c});
}, ce = (a, b, c) => {
  var d = Jb[1];
  K.Fa || (K.Fa = R(8));
  return Nb({target:d, o:"visibilitychange", C:21, H:a, s:c, L:e => {
    var f = K.Fa, g = ["hidden", "visible", "prerender", "unloaded"].indexOf(document.visibilityState);
    m[f] = document.hidden;
    r[f + 4 >> 2] = g;
    U(c, 21, f, a) && e.preventDefault();
  }, G:b});
}, de = a => {
  setTimeout(() => {
    Fd(a);
  }, 10000);
}, V = !1, ee = !1, fe = [];
function ge() {
  function a() {
    ee = document.pointerLockElement === h.canvas;
  }
  if (!he) {
    he = !0;
    eb.push({canHandle:c => !h.noImageDecoding && /\.(jpg|jpeg|png|bmp|webp)$/i.test(c), handle:async(c, d) => {
      var e = new Blob([c], {type:ie(d)});
      e.size !== c.length && (e = new Blob([(new Uint8Array(c)).buffer], {type:ie(d)}));
      var f = URL.createObjectURL(e);
      return new Promise((g, l) => {
        var p = new Image();
        p.onload = () => {
          var q = document.createElement("canvas");
          q.width = p.width;
          q.height = p.height;
          q.getContext("2d").drawImage(p, 0, 0);
          URL.revokeObjectURL(f);
          g(c);
        };
        p.onerror = () => {
          k(`Image ${f} could not be decoded`);
          l();
        };
        p.src = f;
      });
    }});
    eb.push({canHandle:c => !h.noAudioDecoding && c.slice(-4) in {".ogg":1, ".wav":1, ".mp3":1}, handle:async(c, d) => new Promise(e => {
      function f() {
        g || (g = !0, e(c));
      }
      var g = !1, l = new Blob([c], {type:ie(d)});
      l = URL.createObjectURL(l);
      var p = new Audio();
      p.addEventListener("canplaythrough", () => f(p), !1);
      p.onerror = () => {
        if (!g) {
          k(`warning: browser could not fully decode audio ${d}, trying slower base64 approach`);
          for (var q = "data:audio/x-" + d.slice(-3) + ";base64,", u = "", z = 0, x = 0, G = 0; G < c.length; G++) {
            for (z = z << 8 | c[G], x += 8; 6 <= x;) {
              var C = z >> x - 6 & 63;
              x -= 6;
              u += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[C];
            }
          }
          2 == x ? (u += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(z & 3) << 4], u += "==") : 4 == x && (u += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"[(z & 15) << 2], u += "=");
          p.src = q + u;
          f(p);
        }
      };
      p.src = l;
      de(() => {
        f(p);
      });
    })});
    var b = h.canvas;
    b && (document.addEventListener("pointerlockchange", a, !1), h.elementPointerLock && b.addEventListener("click", c => {
      !ee && h.canvas.requestPointerLock && (h.canvas.requestPointerLock(), c.preventDefault());
    }, !1));
  }
}
function je(a) {
  var b = {antialias:1 < ke[135181], depth:0 < ke[135173], stencil:0 < ke[135174], alpha:0 < ke[135172]};
  if (!h.ctx || a != h.canvas) {
    var c, d = {antialias:!1, alpha:!1, kb:1};
    if (b) {
      for (var e in b) {
        d[e] = b[e];
      }
    }
    if ("undefined" != typeof ic && (c = gc(a, d))) {
      var f = $b[c].ka;
    }
    f && (h.ctx = f, hc = $b[c], h.ctx = L = hc?.ka, fe.forEach(g => g()), ge());
  }
}
var le = !1, me = void 0, W = void 0;
function ne(a, b) {
  function c() {
    V = !1;
    var f = d.parentNode;
    zd() === f ? (d.exitFullscreen = oe, me && d.requestPointerLock(), V = !0, W ? pe() : qe(d)) : (f.parentNode.insertBefore(d, f), f.parentNode.removeChild(f), W ? re() : qe(d));
    h.onFullScreen?.(V);
    h.onFullscreen?.(V);
  }
  me = a;
  W = b;
  "undefined" == typeof me && (me = !0);
  "undefined" == typeof W && (W = !1);
  var d = h.canvas;
  le || (le = !0, document.addEventListener("fullscreenchange", c, !1), document.addEventListener("mozfullscreenchange", c, !1), document.addEventListener("webkitfullscreenchange", c, !1), document.addEventListener("MSFullscreenChange", c, !1));
  var e = document.createElement("div");
  d.parentNode.insertBefore(e, d);
  e.appendChild(d);
  e.requestFullscreen = e.requestFullscreen || e.mozRequestFullScreen || e.msRequestFullscreen || (e.webkitRequestFullscreen ? () => e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : null) || (e.webkitRequestFullScreen ? () => e.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : null);
  e.requestFullscreen();
}
function oe() {
  if (!V) {
    return !1;
  }
  (document.exitFullscreen || document.cancelFullScreen || document.mozCancelFullScreen || document.msExitFullscreen || document.webkitCancelFullScreen || (() => {
  })).apply(document, []);
  return !0;
}
function ie(a) {
  return {jpg:"image/jpeg", jpeg:"image/jpeg", png:"image/png", bmp:"image/bmp", ogg:"audio/ogg", wav:"audio/wav", mp3:"audio/mpeg"}[a.slice(a.lastIndexOf(".") + 1)];
}
var se = 0, te = 0, ue = 0, ve = 0;
function we(a, b) {
  var c = h.canvas, d = c.getBoundingClientRect();
  a -= ("undefined" != typeof window.scrollX ? window.scrollX : window.pageXOffset) + d.left;
  b -= ("undefined" != typeof window.scrollY ? window.scrollY : window.pageYOffset) + d.top;
  a *= c.width / d.width;
  b *= c.height / d.height;
  return {x:a, y:b};
}
function xe(a, b) {
  const {x:c, y:d} = we(a, b);
  ue = c - se;
  ve = d - te;
  se = c;
  te = d;
}
function ye(a) {
  ee ? ("mousemove" != a.type && "mozMovementX" in a ? ue = ve = 0 : (ue = a.movementX || a.mozMovementX || a.webkitMovementX || 0, ve = a.movementY || a.mozMovementY || a.webkitMovementY || 0), se += ue, te += ve) : "touchstart" === a.type || "touchend" === a.type || "touchmove" === a.type ? (a = a.Yb, void 0 !== a && we(a.pageX, a.pageY)) : xe(a.pageX, a.pageY);
}
var ze = [];
function Ae() {
  var a = h.canvas;
  ze.forEach(b => b(a.width, a.height));
}
function Be(a, b) {
  qe(h.canvas, a, b);
  Ae();
}
function pe() {
  "undefined" != typeof SDL && (r[SDL.screen >> 2] = t[SDL.screen >> 2] | 8388608);
  qe(h.canvas);
  Ae();
}
function re() {
  "undefined" != typeof SDL && (r[SDL.screen >> 2] = t[SDL.screen >> 2] & -8388609);
  qe(h.canvas);
  Ae();
}
function qe(a, b, c) {
  b && c ? (a.Ga = b, a.va = c) : (b = a.Ga, c = a.va);
  var d = b, e = c;
  0 < h.forcedAspectRatio && (d / e < h.forcedAspectRatio ? d = Math.round(e * h.forcedAspectRatio) : e = Math.round(d / h.forcedAspectRatio));
  if (zd() === a.parentNode && "undefined" != typeof screen) {
    var f = Math.min(screen.width / d, screen.height / e);
    d = Math.round(d * f);
    e = Math.round(e * f);
  }
  W ? (a.width != d && (a.width = d), a.height != e && (a.height = e), "undefined" != typeof a.style && (a.style.removeProperty("width"), a.style.removeProperty("height"))) : (a.width != b && (a.width = b), a.height != c && (a.height = c), "undefined" != typeof a.style && (d != b || e != c ? (a.style.setProperty("width", d + "px", "important"), a.style.setProperty("height", e + "px", "important")) : (a.style.removeProperty("width"), a.style.removeProperty("height"))));
}
var he;
function Ce(a, b, c, d, e, f) {
  this.id = a;
  this.y = this.x = 0;
  this.U = !1;
  this.Sa = this.Ra = 0;
  this.width = b;
  this.height = c;
  this.ra = d;
  this.qa = e;
  this.Aa = b;
  this.za = c;
  this.title = f;
  this.attributes = {...ke};
  this.buttons = 0;
  this.keys = [];
  this.na = [];
  this.pb = 0;
  this.title = null;
  this.S = this.V = this.P = this.ga = this.M = this.O = this.da = this.ia = this.Ka = this.Xa = this.Wa = this.Va = this.ja = 0;
}
var Y = a => 0 >= a || !X ? null : X[a - 1], De = 0, Z = null, Ee = null, X = null, Fe = null, Ge = null, ke = null, He = null, Ie = {131073:0, 131074:0, 131075:1, 131076:1, 131077:1, 131082:0, 135169:8, 135170:8, 135171:8, 135172:8, 135173:24, 135174:8, 135175:0, 135176:0, 135177:0, 135178:0, 135179:0, 135180:0, 135181:0, 135182:0, 135183:0, 139265:196609, 139266:1, 139267:0, 139268:0, 139269:0, 139270:0, 139271:0, 139272:0, 139276:0}, Je = a => {
  switch(a) {
    case 32:
      return 32;
    case 222:
      return 39;
    case 188:
      return 44;
    case 173:
      return 45;
    case 189:
      return 45;
    case 190:
      return 46;
    case 191:
      return 47;
    case 48:
      return 48;
    case 49:
      return 49;
    case 50:
      return 50;
    case 51:
      return 51;
    case 52:
      return 52;
    case 53:
      return 53;
    case 54:
      return 54;
    case 55:
      return 55;
    case 56:
      return 56;
    case 57:
      return 57;
    case 59:
      return 59;
    case 61:
      return 61;
    case 187:
      return 61;
    case 65:
      return 65;
    case 66:
      return 66;
    case 67:
      return 67;
    case 68:
      return 68;
    case 69:
      return 69;
    case 70:
      return 70;
    case 71:
      return 71;
    case 72:
      return 72;
    case 73:
      return 73;
    case 74:
      return 74;
    case 75:
      return 75;
    case 76:
      return 76;
    case 77:
      return 77;
    case 78:
      return 78;
    case 79:
      return 79;
    case 80:
      return 80;
    case 81:
      return 81;
    case 82:
      return 82;
    case 83:
      return 83;
    case 84:
      return 84;
    case 85:
      return 85;
    case 86:
      return 86;
    case 87:
      return 87;
    case 88:
      return 88;
    case 89:
      return 89;
    case 90:
      return 90;
    case 219:
      return 91;
    case 220:
      return 92;
    case 221:
      return 93;
    case 192:
      return 96;
    case 27:
      return 256;
    case 13:
      return 257;
    case 9:
      return 258;
    case 8:
      return 259;
    case 45:
      return 260;
    case 46:
      return 261;
    case 39:
      return 262;
    case 37:
      return 263;
    case 40:
      return 264;
    case 38:
      return 265;
    case 33:
      return 266;
    case 34:
      return 267;
    case 36:
      return 268;
    case 35:
      return 269;
    case 20:
      return 280;
    case 145:
      return 281;
    case 144:
      return 282;
    case 44:
      return 283;
    case 19:
      return 284;
    case 112:
      return 290;
    case 113:
      return 291;
    case 114:
      return 292;
    case 115:
      return 293;
    case 116:
      return 294;
    case 117:
      return 295;
    case 118:
      return 296;
    case 119:
      return 297;
    case 120:
      return 298;
    case 121:
      return 299;
    case 122:
      return 300;
    case 123:
      return 301;
    case 124:
      return 302;
    case 125:
      return 303;
    case 126:
      return 304;
    case 127:
      return 305;
    case 128:
      return 306;
    case 129:
      return 307;
    case 130:
      return 308;
    case 131:
      return 309;
    case 132:
      return 310;
    case 133:
      return 311;
    case 134:
      return 312;
    case 135:
      return 313;
    case 136:
      return 314;
    case 96:
      return 320;
    case 97:
      return 321;
    case 98:
      return 322;
    case 99:
      return 323;
    case 100:
      return 324;
    case 101:
      return 325;
    case 102:
      return 326;
    case 103:
      return 327;
    case 104:
      return 328;
    case 105:
      return 329;
    case 110:
      return 330;
    case 111:
      return 331;
    case 106:
      return 332;
    case 109:
      return 333;
    case 107:
      return 334;
    case 16:
      return 340;
    case 17:
      return 341;
    case 18:
      return 342;
    case 91:
      return 343;
    case 224:
      return 343;
    case 93:
      return 348;
    default:
      return -1;
  }
}, Ke = () => {
  var a = Z, b = 0;
  a.keys[340] && (b |= 1);
  a.keys[341] && (b |= 2);
  a.keys[342] && (b |= 4);
  if (a.keys[343] || a.keys[348]) {
    b |= 8;
  }
  return b;
}, Le = a => {
  Z && Z.S && !a.ctrlKey && !a.metaKey && (a = a.charCode, 0 == a || 0 <= a && 31 >= a || dynCall_vii(Z.S, Z.id, a));
}, Ne = (a, b) => {
  if (Z) {
    var c = Je(a);
    if (-1 != c) {
      var d = b && Z.keys[c];
      Z.keys[c] = b;
      Z.na[a] = b;
      Z.V && (d && (b = 2), Me(Z.V, Z.id, c, a, b, Ke()));
    }
  }
}, Pe = () => {
  Oe();
}, Qe = () => {
  Oe();
}, Re = a => {
  Ne(a.keyCode, 1);
  "Backspace" != a.key && "Tab" != a.key || a.preventDefault();
}, Se = a => {
  Ne(a.keyCode, 0);
}, Te = () => {
  if (Z) {
    for (var a = 0; a < Z.na.length; ++a) {
      Z.na[a] && Ne(a, 0);
    }
  }
}, Ve = a => {
  if (Z) {
    if ("touchmove" === a.type) {
      a.preventDefault();
      let b = !1;
      for (let c of a.changedTouches) {
        if (He === c.identifier) {
          xe(c.pageX, c.pageY);
          b = !0;
          break;
        }
      }
      if (!b) {
        return;
      }
    } else {
      ye(a);
    }
    a.target == h.canvas && Z.O && Z.O && Ue(Z.O, Z.id, se, te);
  }
}, We = a => {
  Z && a.target == h.canvas && Z.M && dynCall_vii(Z.M, Z.id, 1);
}, Xe = a => {
  Z && a.target == h.canvas && Z.M && dynCall_vii(Z.M, Z.id, 0);
}, Ze = (a, b) => {
  if (Z && a.target == h.canvas) {
    var c = 0;
    if ("touchstart" === a.type || "touchend" === a.type || "touchcancel" === a.type) {
      a.preventDefault();
      var d = !1;
      if (null === He && "touchstart" === a.type && 0 < a.targetTouches.length) {
        d = a.targetTouches[0], He = d.identifier, xe(d.pageX, d.pageY), d = !0;
      } else if ("touchend" === a.type || "touchcancel" === a.type) {
        for (let e of a.changedTouches) {
          if (He === e.identifier) {
            He = null;
            d = !0;
            break;
          }
        }
      }
      if (!d) {
        return;
      }
    } else {
      ye(a), c = a.button, 0 < c && (c = 1 == c ? 2 : 1);
    }
    if (1 == b) {
      Z.buttons |= 1 << c;
      try {
        a.target.setCapture();
      } catch (e) {
      }
    } else {
      Z.buttons &= ~(1 << c);
    }
    Z.da && Ye(Z.da, Z.id, c, b, Ke());
  }
}, $e = a => {
  Z && Ze(a, 1);
}, af = a => {
  Z && Ze(a, 0);
}, bf = a => {
  var b = 0;
  switch(a.type) {
    case "DOMMouseScroll":
      b = a.detail / 3;
      break;
    case "mousewheel":
      b = a.wheelDelta / 120;
      break;
    case "wheel":
      b = a.deltaY;
      switch(a.deltaMode) {
        case 0:
          b /= 100;
          break;
        case 1:
          b /= 3;
          break;
        case 2:
          b *= 80;
          break;
        default:
          ua("unrecognized mouse wheel delta mode: " + a.deltaMode);
      }break;
    default:
      ua("unrecognized mouse wheel event: " + a.type);
  }
  b = -b;
  b = 0 == b ? 0 : 0 < b ? Math.max(b, 1) : Math.min(b, -1);
  Z && Z.ga && a.target == h.canvas && (Ue(Z.ga, Z.id, "mousewheel" == a.type ? a.wheelDeltaX : a.deltaX, b), a.preventDefault());
}, df = (a, b, c, d) => {
  if (Z) {
    var e = !1;
    zd() ? Z.U || (e = a != screen.width || b != screen.height, Z.Ra = Z.x, Z.Sa = Z.y, Z.Aa = Z.width, Z.za = Z.height, Z.x = Z.y = 0, Z.width = screen.width, Z.height = screen.height, Z.U = !0) : 1 == Z.U && (e = a != Z.Aa || b != Z.za, Z.x = Z.Ra, Z.y = Z.Sa, Z.width = Z.Aa, Z.height = Z.za, Z.U = !1);
    if (e) {
      Be(Z.width, Z.height);
    } else if (Z.width != a || Z.height != b || Z.ra != c || Z.qa != d) {
      Z.width = a, Z.height = b, Z.ra = c, Z.qa = d, Z && Z.ja && cf(Z.ja, Z.id, Z.width, Z.height), Z && Z.Ka && cf(Z.Ka, Z.id, Z.ra, Z.qa);
    }
  }
}, ef = {}, ff = [], gf = null, Oe = () => {
  if (Sd !== gf || !Sd) {
    ff = navigator.getGamepads ? navigator.getGamepads() : navigator.webkitGetGamepads || [];
    gf = Sd;
    for (var a = 0; a < ff.length; ++a) {
      var b = ff[a];
      if (b) {
        ef[a] || (ma("glfw joystick connected:", a), ef[a] = {id:Zc(b.id), wb:b.buttons.length, ub:b.axes.length, buttons:R(b.buttons.length), axes:R(4 * b.axes.length)});
        for (var c = ef[a], d = 0; d < b.buttons.length; ++d) {
          m[c.buttons + d] = b.buttons[d].pressed;
        }
        for (d = 0; d < b.axes.length; ++d) {
          v[c.axes + 4 * d >> 2] = b.axes[d];
        }
      } else {
        ef[a] && (ma("glfw joystick disconnected", a), hf(ef[a].id), hf(ef[a].buttons), hf(ef[a].axes), delete ef[a]);
      }
    }
  }
}, jf = a => {
  function b(q, u, z) {
    var x = "/.glfw_dropped_files" + u + "/" + q.name.replace(/\//g, "_"), G = new FileReader();
    G.onloadend = C => {
      if (2 != G.readyState) {
        ++l, k(`failed to read dropped file: ${u}/${q.name}: ${G.error}`);
      } else {
        var M = new Uint8Array(C.target.result);
        C = {};
        C.flags = C.flags || 577;
        var T = yb(x, C.flags, C.mode);
        "string" == typeof M && (M = Qa(M));
        M.subarray || (M = new Uint8Array(M));
        Bb(T, M, 0, M.byteLength, void 0, C.Cb);
        zb(T);
        if (++l === z) {
          cf(Z.P, Z.id, e.length, d);
          for (C = 0; C < e.length; ++C) {
            hf(e[C]);
          }
          hf(d);
        }
      }
    };
    G.readAsArrayBuffer(q);
  }
  function c() {
    for (var q = p.length, u = 0; u < q; ++u) {
      b(p[u].file, p[u].path, q);
    }
  }
  if (Z && Z.P && a.dataTransfer && a.dataTransfer.files && 0 != a.dataTransfer.files.length) {
    a.preventDefault();
    for (var d = R(4 * a.dataTransfer.files.length), e = [], f = 0; f < a.dataTransfer.files.length; ++f) {
      var g = `/${".glfw_dropped_files"}/${a.dataTransfer.files[f].name.replace(/\//g, "_")}`;
      g = Zc(g);
      e.push(g);
      t[d + 4 * f >> 2] = g;
    }
    var l = 0;
    Cb("/", ".glfw_dropped_files");
    var p = [];
    if (DataTransferItem.prototype.webkitGetAsEntry) {
      let q = {};
      function u(x, G) {
        if (0 == q[x].ha.length) {
          delete q[x];
          var C = x.substring(0, x.lastIndexOf("/"));
          q.hasOwnProperty(C) && (x = q[C].ha.indexOf(x), -1 < x && q[C].ha.splice(x, 1), G && u(C, !0));
          0 == Object.keys(q).length && c();
        }
      }
      function z(x) {
        let G = x.fullPath, C = G.substring(0, G.lastIndexOf("/"));
        q[G] = {ha:[]};
        if (x.isFile) {
          x.file(pa => {
            p.push({file:pa, path:C});
            u(G, !1);
          });
        } else if (x.isDirectory) {
          q.hasOwnProperty(C) && q[C].ha.push(G);
          Cb("/.glfw_dropped_files" + C, x.name);
          var M = x.createReader(), T = function(pa) {
            if (0 == pa.length) {
              u(G, !0);
            } else {
              for (const Sa of pa) {
                z(Sa);
              }
              M.readEntries(T);
            }
          };
          M.readEntries(T);
        }
      }
      for (const x of a.dataTransfer.items) {
        z(x.webkitGetAsEntry());
      }
    } else {
      for (const q of a.dataTransfer.files) {
        p.push({file:q, path:""});
      }
      c();
    }
    return !1;
  }
}, kf = a => {
  if (Z && Z.P) {
    return a.preventDefault(), !1;
  }
};
function lf(a, b) {
  function c() {
    V = !1;
    var f = d.parentNode;
    zd() === f ? (d.exitFullscreen = oe, me && d.requestPointerLock(), V = !0, W ? pe() : (qe(d), Ae())) : (f.parentNode.insertBefore(d, f), f.parentNode.removeChild(f), W ? re() : (qe(d), Ae()));
    h.onFullScreen?.(V);
    h.onFullscreen?.(V);
  }
  me = a;
  W = b;
  "undefined" == typeof me && (me = !0);
  "undefined" == typeof W && (W = !1);
  var d = h.canvas;
  le || (le = !0, document.addEventListener("fullscreenchange", c, !1), document.addEventListener("mozfullscreenchange", c, !1), document.addEventListener("webkitfullscreenchange", c, !1), document.addEventListener("MSFullscreenChange", c, !1));
  var e = document.createElement("div");
  d.parentNode.insertBefore(e, d);
  e.appendChild(d);
  e.requestFullscreen = e.requestFullscreen || e.mozRequestFullScreen || e.msRequestFullscreen || (e.webkitRequestFullscreen ? () => e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : null) || (e.webkitRequestFullScreen ? () => e.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : null);
  e.requestFullscreen();
}
function mf(a, b, c) {
  var d = nf() ? Ee : 1.0;
  b && c ? (a.Ga = b, a.va = c) : (b = a.Ga, c = a.va);
  var e = b, f = c;
  h.forcedAspectRatio && 0 < h.forcedAspectRatio && (e / f < h.forcedAspectRatio ? e = Math.round(f * h.forcedAspectRatio) : f = Math.round(e / h.forcedAspectRatio));
  if (zd() === a.parentNode && "undefined" != typeof screen) {
    var g = Math.min(screen.width / e, screen.height / f);
    e = Math.round(e * g);
    f = Math.round(f * g);
  }
  W && (b = e, c = f);
  e = Math.floor(b * d);
  d = Math.floor(c * d);
  a.width != e && (a.width = e);
  a.height != d && (a.height = d);
  "undefined" != typeof a.style && (nf() ? (a.style.setProperty("width", b + "px", "important"), a.style.setProperty("height", c + "px", "important")) : (a.style.removeProperty("width"), a.style.removeProperty("height")));
}
function of(a, b) {
  const c = h.canvas.getBoundingClientRect();
  a -= ("undefined" != typeof window.scrollX ? window.scrollX : window.pageXOffset) + c.left;
  b -= ("undefined" != typeof window.scrollY ? window.scrollY : window.pageYOffset) + c.top;
  !nf() && Z && (a *= Z.width / c.width, b *= Z.height / c.height);
  return {x:a, y:b};
}
function pf() {
  return "number" == typeof devicePixelRatio && devicePixelRatio || 1.0;
}
function nf() {
  return Z ? 0 < Z.attributes[139276] : !1;
}
function qf() {
  Z && (qe(h.canvas, Z.width, Z.height), Ae());
}
function rf() {
  Ee = pf();
  Z && Z.ia && sf(Z.ia, Z.id, Ee, Ee);
  qf();
}
var uf = a => {
  var b = Pa(a) + 1, c = tf(b);
  A(a, n, c, b);
  return c;
};
function vf(a) {
  var b = (...c) => {
    wf.push(a);
    try {
      return a(...c);
    } finally {
      oa || wf.pop();
    }
  };
  xf.set(a, b);
  return b;
}
var wf = [], xf = new Map();
bb = Array(4096);
ub(D, "/");
F("/tmp");
F("/home");
F("/home/web_user");
(function() {
  F("/dev");
  Ua(259, {read:() => 0, write:(d, e, f, g) => g, u:() => 0});
  wb("/dev/null", 259);
  Ta(1280, Wa);
  Ta(1536, Xa);
  wb("/dev/tty", 1280);
  wb("/dev/tty1", 1536);
  var a = new Uint8Array(1024), b = 0, c = () => {
    0 === b && (Ma(a), b = a.byteLength);
    return a[--b];
  };
  Db("random", c);
  Db("urandom", c);
  F("/dev/shm");
  F("/dev/shm/tmp");
})();
(function() {
  F("/proc");
  var a = F("/proc/self");
  F("/proc/self/fd");
  ub({D() {
    var b = Za(a, "fd", 16895, 73);
    b.g = {u:D.g.u};
    b.h = {lookup(c, d) {
      c = +d;
      var e = E(c);
      c = {parent:null, D:{Oa:"fake"}, h:{readlink:() => e.path}, id:c + 1};
      return c.parent = c;
    }, readdir() {
      return Array.from(hb.entries()).filter(([, c]) => c).map(([c]) => c.toString());
    }};
    return b;
  }}, "/proc/self/fd");
})();
for (let a = 0; 32 > a; ++a) {
  Ic.push(Array(a));
}
for (var yf = new Float32Array(288), zf = 0; 288 >= zf; ++zf) {
  od[zf] = yf.subarray(0, zf);
}
var Af = new Int32Array(288);
for (zf = 0; 288 >= zf; ++zf) {
  qd[zf] = Af.subarray(0, zf);
}
h.requestAnimationFrame = Nd;
h.pauseMainLoop = function() {
  Kd = null;
  Qd++;
};
h.resumeMainLoop = function() {
  Qd++;
  var a = Gd, b = Hd, c = Id;
  Id = null;
  Zd(c, 0, !1, Rd, !0);
  Pd(a, b);
  Kd();
};
h.preMainLoop && Ud.push(h.preMainLoop);
h.postMainLoop && Vd.push(h.postMainLoop);
h.noExitRuntime && (Ga = h.noExitRuntime);
h.preloadPlugins && (eb = h.preloadPlugins);
h.print && (ma = h.print);
h.printErr && (k = h.printErr);
h.wasmBinary && (na = h.wasmBinary);
h.arguments && (da = h.arguments);
h.thisProgram && (ea = h.thisProgram);
if (h.preInit) {
  for ("function" == typeof h.preInit && (h.preInit = [h.preInit]); 0 < h.preInit.length;) {
    h.preInit.shift()();
  }
}
h.ccall = (a, b, c, d, e) => {
  var f = {string:u => {
    var z = 0;
    null !== u && void 0 !== u && 0 !== u && (z = uf(u));
    return z;
  }, array:u => {
    var z = tf(u.length);
    m.set(u, z);
    return z;
  }};
  a = h["_" + a];
  var g = [], l = 0;
  if (d) {
    for (var p = 0; p < d.length; p++) {
      var q = f[c[p]];
      q ? (0 === l && (l = Bf()), g[p] = q(d[p])) : g[p] = d[p];
    }
  }
  c = a(...g);
  e = e?.async;
  Gb += 1;
  c = function(u) {
    --Gb;
    0 !== l && Cf(l);
    return "string" === b ? u ? y(n, u) : "" : "boolean" === b ? !!u : u;
  }(c);
  return e ? Promise.resolve(c) : c;
};
var Df = {95917:() => {
  if (document.fullscreenElement) {
    return 1;
  }
}, 95963:() => h.canvas.width, 95995:() => parseInt(h.canvas.style.width), 96043:() => {
  document.exitFullscreen();
}, 96070:() => {
  setTimeout(function() {
    h.requestFullscreen(!1, !1);
  }, 100);
}, 96142:() => {
  if (document.fullscreenElement) {
    return 1;
  }
}, 96188:() => h.canvas.width, 96220:() => screen.width, 96245:() => {
  document.exitFullscreen();
}, 96272:a => {
  const b = a ? y(n, a) : "";
  setTimeout(function() {
    h.requestFullscreen(!1, !0);
    setTimeout(function() {
      document.querySelector(b).style.width = "unset";
    }, 100);
  }, 100);
}, 96466:() => window.innerWidth, 96492:() => window.innerHeight, 96519:() => {
  if (document.fullscreenElement) {
    return 1;
  }
}, 96565:() => h.canvas.width, 96597:() => parseInt(h.canvas.style.width), 96645:() => {
  if (document.fullscreenElement) {
    return 1;
  }
}, 96691:() => h.canvas.width, 96723:() => screen.width, 96748:() => window.innerWidth, 96774:() => window.innerHeight, 96801:() => {
  if (document.fullscreenElement) {
    return 1;
  }
}, 96847:() => h.canvas.width, 96879:() => screen.width, 96904:() => {
  document.exitFullscreen();
}, 96931:() => {
  if (document.fullscreenElement) {
    return 1;
  }
}, 96977:() => h.canvas.width, 97009:() => parseInt(h.canvas.style.width), 97057:() => {
  document.exitFullscreen();
}, 97084:a => {
  h.canvas.style.opacity = a;
}, 97122:() => screen.width, 97147:() => screen.height, 97173:() => window.screenX, 97200:() => window.screenY, 97227:() => window.devicePixelRatio, 97263:a => {
  navigator.clipboard.writeText(a ? y(n, a) : "");
}, 97316:a => {
  h.canvas.style.cursor = a ? y(n, a) : "";
}, 97367:() => {
  h.canvas.style.cursor = "none";
}, 97404:(a, b, c, d) => {
  try {
    navigator.getGamepads()[a].Lb.Qb("dual-rumble", {Wb:0, duration:d, Zb:b, Xb:c});
  } catch (e) {
    try {
      navigator.getGamepads()[a].J[0].Rb(c, d);
    } catch (f) {
    }
  }
}, 97660:a => {
  h.canvas.style.cursor = a ? y(n, a) : "";
}, 97711:() => {
  if (document.pointerLockElement) {
    return 1;
  }
}, 97758:() => {
  if (document.fullscreenElement) {
    return 1;
  }
}, 97804:() => window.innerWidth, 97830:() => window.innerHeight}, hf, R, Ef, cb, Cf, tf, Bf, dynCall_vii, cf, sf, Me, Ye, Ue, U, dynCall_vi, dynCall_v, dynCall_iii, Ff, Gf = {SetCanvasIdJs:function(a, b) {
  A("#" + h.canvas.id, n, a, b);
}, __assert_fail:(a, b, c, d) => ua(`Assertion failed: ${a ? y(n, a) : ""}, at: ` + [b ? b ? y(n, b) : "" : "unknown filename", c, d ? d ? y(n, d) : "" : "unknown function"]), __call_sighandler:(a, b) => dynCall_vi(a, b), __syscall_faccessat:function(a, b, c) {
  try {
    b = b ? y(n, b) : "";
    b = Eb(a, b);
    if (c & -8) {
      return -28;
    }
    var d = nb(b, {T:!0}).node;
    if (!d) {
      return -44;
    }
    a = "";
    c & 4 && (a += "r");
    c & 2 && (a += "w");
    c & 1 && (a += "x");
    return a && pb(d, a) ? -2 : 0;
  } catch (e) {
    if ("undefined" == typeof H || "ErrnoError" !== e.name) {
      throw e;
    }
    return -e.j;
  }
}, __syscall_fcntl64:function(a, b, c) {
  Fb = c;
  try {
    var d = E(a);
    switch(b) {
      case 0:
        var e = I();
        if (0 > e) {
          break;
        }
        for (; hb[e];) {
          e++;
        }
        return sb(d, e).fd;
      case 1:
      case 2:
        return 0;
      case 3:
        return d.flags;
      case 4:
        return e = I(), d.flags |= e, 0;
      case 12:
        return e = I(), ra[e + 0 >> 1] = 2, 0;
      case 13:
      case 14:
        return 0;
    }
    return -28;
  } catch (f) {
    if ("undefined" == typeof H || "ErrnoError" !== f.name) {
      throw f;
    }
    return -f.j;
  }
}, __syscall_getcwd:function(a, b) {
  try {
    if (0 === b) {
      return -28;
    }
    var c = Pa("/") + 1;
    if (b < c) {
      return -68;
    }
    A("/", n, a, b);
    return c;
  } catch (d) {
    if ("undefined" == typeof H || "ErrnoError" !== d.name) {
      throw d;
    }
    return -d.j;
  }
}, __syscall_ioctl:function(a, b, c) {
  Fb = c;
  try {
    var d = E(a);
    switch(b) {
      case 21509:
        return d.tty ? 0 : -59;
      case 21505:
        if (!d.tty) {
          return -59;
        }
        if (d.tty.F.hb) {
          a = [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          var e = I();
          r[e >> 2] = 25856;
          r[e + 4 >> 2] = 5;
          r[e + 8 >> 2] = 191;
          r[e + 12 >> 2] = 35387;
          for (var f = 0; 32 > f; f++) {
            m[e + f + 17] = a[f] || 0;
          }
        }
        return 0;
      case 21510:
      case 21511:
      case 21512:
        return d.tty ? 0 : -59;
      case 21506:
      case 21507:
      case 21508:
        if (!d.tty) {
          return -59;
        }
        if (d.tty.F.ib) {
          for (e = I(), a = [], f = 0; 32 > f; f++) {
            a.push(m[e + f + 17]);
          }
        }
        return 0;
      case 21519:
        if (!d.tty) {
          return -59;
        }
        e = I();
        return r[e >> 2] = 0;
      case 21520:
        return d.tty ? -28 : -59;
      case 21537:
      case 21531:
        e = I();
        if (!d.g.gb) {
          throw new B(59);
        }
        return d.g.gb(d, b, e);
      case 21523:
        if (!d.tty) {
          return -59;
        }
        d.tty.F.jb && (f = [24, 80], e = I(), ra[e >> 1] = f[0], ra[e + 2 >> 1] = f[1]);
        return 0;
      case 21524:
        return d.tty ? 0 : -59;
      case 21515:
        return d.tty ? 0 : -59;
      default:
        return -28;
    }
  } catch (g) {
    if ("undefined" == typeof H || "ErrnoError" !== g.name) {
      throw g;
    }
    return -g.j;
  }
}, __syscall_openat:function(a, b, c, d) {
  Fb = d;
  try {
    b = b ? y(n, b) : "";
    b = Eb(a, b);
    var e = d ? I() : 0;
    return yb(b, c, e).fd;
  } catch (f) {
    if ("undefined" == typeof H || "ErrnoError" !== f.name) {
      throw f;
    }
    return -f.j;
  }
}, _abort_js:() => ua(""), _emscripten_runtime_keepalive_clear:() => {
  Ga = !1;
  Gb = 0;
}, _mmap_js:function(a, b, c, d, e, f, g) {
  e = -9007199254740992 > e || 9007199254740992 < e ? NaN : Number(e);
  try {
    var l = E(d);
    if (0 !== (b & 2) && 0 === (c & 2) && 2 !== (l.flags & 2097155)) {
      throw new B(2);
    }
    if (1 === (l.flags & 2097155)) {
      throw new B(2);
    }
    if (!l.g.aa) {
      throw new B(43);
    }
    if (!a) {
      throw new B(28);
    }
    var p = l.g.aa(l, a, e, b, c);
    var q = p.ob;
    r[f >> 2] = p.Ya;
    t[g >> 2] = q;
    return 0;
  } catch (u) {
    if ("undefined" == typeof H || "ErrnoError" !== u.name) {
      throw u;
    }
    return -u.j;
  }
}, _munmap_js:function(a, b, c, d, e, f) {
  f = -9007199254740992 > f || 9007199254740992 < f ? NaN : Number(f);
  try {
    var g = E(e);
    if (c & 2) {
      c = f;
      if (32768 !== (g.node.mode & 61440)) {
        throw new B(43);
      }
      if (!(d & 2)) {
        var l = n.slice(a, a + b);
        g.g.fa && g.g.fa(g, l, c, b, d);
      }
    }
  } catch (p) {
    if ("undefined" == typeof H || "ErrnoError" !== p.name) {
      throw p;
    }
    return -p.j;
  }
}, clock_time_get:function(a, b, c) {
  if (!(0 <= a && 3 >= a)) {
    return 28;
  }
  ta[c >> 3] = BigInt(Math.round(1E6 * (0 === a ? Date.now() : performance.now())));
  return 0;
}, emscripten_asm_const_double:(a, b, c) => {
  b = Ib(b, c);
  return Df[a](...b);
}, emscripten_asm_const_int:(a, b, c) => {
  b = Ib(b, c);
  return Df[a](...b);
}, emscripten_date_now:() => Date.now(), emscripten_get_element_css_size:(a, b, c) => {
  a = J(a);
  if (!a) {
    return -4;
  }
  a = Kb(a);
  w[b >> 3] = a.width;
  w[c >> 3] = a.height;
  return 0;
}, emscripten_get_gamepad_status:(a, b) => {
  if (0 > a || a >= K.W.length) {
    return -5;
  }
  if (!K.W[a]) {
    return -7;
  }
  Pb(b, K.W[a]);
  return 0;
}, emscripten_get_now:() => performance.now(), emscripten_get_num_gamepads:() => K.W.length, emscripten_glActiveTexture:jc, emscripten_glAttachShader:kc, emscripten_glBeginQueryEXT:(a, b) => {
  L.B.beginQueryEXT(a, P[b]);
}, emscripten_glBindAttribLocation:lc, emscripten_glBindBuffer:mc, emscripten_glBindFramebuffer:(a, b) => {
  L.bindFramebuffer(a, Wb[b]);
}, emscripten_glBindRenderbuffer:(a, b) => {
  L.bindRenderbuffer(a, Xb[b]);
}, emscripten_glBindTexture:nc, emscripten_glBindVertexArrayOES:a => {
  L.bindVertexArray(Zb[a]);
}, emscripten_glBlendColor:(a, b, c, d) => L.blendColor(a, b, c, d), emscripten_glBlendEquation:a => L.blendEquation(a), emscripten_glBlendEquationSeparate:(a, b) => L.blendEquationSeparate(a, b), emscripten_glBlendFunc:oc, emscripten_glBlendFuncSeparate:(a, b, c, d) => L.blendFuncSeparate(a, b, c, d), emscripten_glBufferData:pc, emscripten_glBufferSubData:qc, emscripten_glCheckFramebufferStatus:a => L.checkFramebufferStatus(a), emscripten_glClear:rc, emscripten_glClearColor:sc, emscripten_glClearDepthf:tc, 
emscripten_glClearStencil:a => L.clearStencil(a), emscripten_glClipControlEXT:(a, b) => {
  L.cb.clipControlEXT(a, b);
}, emscripten_glColorMask:(a, b, c, d) => {
  L.colorMask(!!a, !!b, !!c, !!d);
}, emscripten_glCompileShader:uc, emscripten_glCompressedTexImage2D:vc, emscripten_glCompressedTexSubImage2D:(a, b, c, d, e, f, g, l, p) => {
  L.compressedTexSubImage2D(a, b, c, d, e, f, g, n.subarray(p, p + l));
}, emscripten_glCopyTexImage2D:(a, b, c, d, e, f, g, l) => L.copyTexImage2D(a, b, c, d, e, f, g, l), emscripten_glCopyTexSubImage2D:(a, b, c, d, e, f, g, l) => L.copyTexSubImage2D(a, b, c, d, e, f, g, l), emscripten_glCreateProgram:wc, emscripten_glCreateShader:xc, emscripten_glCullFace:yc, emscripten_glDeleteBuffers:zc, emscripten_glDeleteFramebuffers:(a, b) => {
  for (var c = 0; c < a; ++c) {
    var d = r[b + 4 * c >> 2], e = Wb[d];
    e && (L.deleteFramebuffer(e), e.name = 0, Wb[d] = null);
  }
}, emscripten_glDeleteProgram:Ac, emscripten_glDeleteQueriesEXT:(a, b) => {
  for (var c = 0; c < a; c++) {
    var d = r[b + 4 * c >> 2], e = P[d];
    e && (L.B.deleteQueryEXT(e), P[d] = null);
  }
}, emscripten_glDeleteRenderbuffers:(a, b) => {
  for (var c = 0; c < a; c++) {
    var d = r[b + 4 * c >> 2], e = Xb[d];
    e && (L.deleteRenderbuffer(e), e.name = 0, Xb[d] = null);
  }
}, emscripten_glDeleteShader:Bc, emscripten_glDeleteTextures:Cc, emscripten_glDeleteVertexArraysOES:(a, b) => {
  for (var c = 0; c < a; c++) {
    var d = r[b + 4 * c >> 2];
    L.deleteVertexArray(Zb[d]);
    Zb[d] = null;
  }
}, emscripten_glDepthFunc:Dc, emscripten_glDepthMask:a => {
  L.depthMask(!!a);
}, emscripten_glDepthRangef:(a, b) => L.depthRange(a, b), emscripten_glDetachShader:Ec, emscripten_glDisable:Fc, emscripten_glDisableVertexAttribArray:Gc, emscripten_glDrawArrays:Hc, emscripten_glDrawArraysInstancedANGLE:(a, b, c, d) => {
  L.drawArraysInstanced(a, b, c, d);
}, emscripten_glDrawBuffersWEBGL:(a, b) => {
  for (var c = Ic[a], d = 0; d < a; d++) {
    c[d] = r[b + 4 * d >> 2];
  }
  L.drawBuffers(c);
}, emscripten_glDrawElements:Jc, emscripten_glDrawElementsInstancedANGLE:(a, b, c, d, e) => {
  L.drawElementsInstanced(a, b, c, d, e);
}, emscripten_glEnable:Kc, emscripten_glEnableVertexAttribArray:Lc, emscripten_glEndQueryEXT:a => {
  L.B.endQueryEXT(a);
}, emscripten_glFinish:() => L.finish(), emscripten_glFlush:() => L.flush(), emscripten_glFramebufferRenderbuffer:(a, b, c, d) => {
  L.framebufferRenderbuffer(a, b, c, Xb[d]);
}, emscripten_glFramebufferTexture2D:(a, b, c, d, e) => {
  L.framebufferTexture2D(a, b, c, Yb[d], e);
}, emscripten_glFrontFace:Mc, emscripten_glGenBuffers:Nc, emscripten_glGenFramebuffers:(a, b) => {
  ec(a, b, "createFramebuffer", Wb);
}, emscripten_glGenQueriesEXT:(a, b) => {
  for (var c = 0; c < a; c++) {
    var d = L.B.createQueryEXT();
    if (!d) {
      for (Q ||= 1282; c < a;) {
        r[b + 4 * c++ >> 2] = 0;
      }
      break;
    }
    var e = dc(P);
    d.name = e;
    P[e] = d;
    r[b + 4 * c >> 2] = e;
  }
}, emscripten_glGenRenderbuffers:(a, b) => {
  ec(a, b, "createRenderbuffer", Xb);
}, emscripten_glGenTextures:Oc, emscripten_glGenVertexArraysOES:(a, b) => {
  ec(a, b, "createVertexArray", Zb);
}, emscripten_glGenerateMipmap:a => L.generateMipmap(a), emscripten_glGetActiveAttrib:(a, b, c, d, e, f, g) => Pc("getActiveAttrib", a, b, c, d, e, f, g), emscripten_glGetActiveUniform:(a, b, c, d, e, f, g) => Pc("getActiveUniform", a, b, c, d, e, f, g), emscripten_glGetAttachedShaders:(a, b, c, d) => {
  a = L.getAttachedShaders(N[a]);
  var e = a.length;
  e > b && (e = b);
  r[c >> 2] = e;
  for (b = 0; b < e; ++b) {
    r[d + 4 * b >> 2] = O.indexOf(a[b]);
  }
}, emscripten_glGetAttribLocation:Qc, emscripten_glGetBooleanv:(a, b) => Rc(a, b, 4), emscripten_glGetBufferParameteriv:(a, b, c) => {
  c ? r[c >> 2] = L.getBufferParameter(a, b) : Q ||= 1281;
}, emscripten_glGetError:() => {
  var a = L.getError() || Q;
  Q = 0;
  return a;
}, emscripten_glGetFloatv:Sc, emscripten_glGetFramebufferAttachmentParameteriv:(a, b, c, d) => {
  a = L.getFramebufferAttachmentParameter(a, b, c);
  if (a instanceof WebGLRenderbuffer || a instanceof WebGLTexture) {
    a = a.name | 0;
  }
  r[d >> 2] = a;
}, emscripten_glGetIntegerv:(a, b) => Rc(a, b, 0), emscripten_glGetProgramInfoLog:Tc, emscripten_glGetProgramiv:Uc, emscripten_glGetQueryObjecti64vEXT:Vc, emscripten_glGetQueryObjectivEXT:Wc, emscripten_glGetQueryObjectui64vEXT:Vc, emscripten_glGetQueryObjectuivEXT:Wc, emscripten_glGetQueryivEXT:(a, b, c) => {
  c ? r[c >> 2] = L.B.getQueryEXT(a, b) : Q ||= 1281;
}, emscripten_glGetRenderbufferParameteriv:(a, b, c) => {
  c ? r[c >> 2] = L.getRenderbufferParameter(a, b) : Q ||= 1281;
}, emscripten_glGetShaderInfoLog:Xc, emscripten_glGetShaderPrecisionFormat:(a, b, c, d) => {
  a = L.getShaderPrecisionFormat(a, b);
  r[c >> 2] = a.rangeMin;
  r[c + 4 >> 2] = a.rangeMax;
  r[d >> 2] = a.precision;
}, emscripten_glGetShaderSource:(a, b, c, d) => {
  if (a = L.getShaderSource(O[a])) {
    b = 0 < b && d ? A(a, n, d, b) : 0, c && (r[c >> 2] = b);
  }
}, emscripten_glGetShaderiv:Yc, emscripten_glGetString:ad, emscripten_glGetTexParameterfv:(a, b, c) => {
  c ? v[c >> 2] = L.getTexParameter(a, b) : Q ||= 1281;
}, emscripten_glGetTexParameteriv:(a, b, c) => {
  c ? r[c >> 2] = L.getTexParameter(a, b) : Q ||= 1281;
}, emscripten_glGetUniformLocation:dd, emscripten_glGetUniformfv:(a, b, c) => {
  ed(a, b, c, 2);
}, emscripten_glGetUniformiv:(a, b, c) => {
  ed(a, b, c, 0);
}, emscripten_glGetVertexAttribPointerv:(a, b, c) => {
  c ? r[c >> 2] = L.getVertexAttribOffset(a, b) : Q ||= 1281;
}, emscripten_glGetVertexAttribfv:(a, b, c) => {
  fd(a, b, c, 2);
}, emscripten_glGetVertexAttribiv:(a, b, c) => {
  fd(a, b, c, 5);
}, emscripten_glHint:(a, b) => L.hint(a, b), emscripten_glIsBuffer:a => (a = Vb[a]) ? L.isBuffer(a) : 0, emscripten_glIsEnabled:a => L.isEnabled(a), emscripten_glIsFramebuffer:a => (a = Wb[a]) ? L.isFramebuffer(a) : 0, emscripten_glIsProgram:a => (a = N[a]) ? L.isProgram(a) : 0, emscripten_glIsQueryEXT:a => (a = P[a]) ? L.B.isQueryEXT(a) : 0, emscripten_glIsRenderbuffer:a => (a = Xb[a]) ? L.isRenderbuffer(a) : 0, emscripten_glIsShader:a => (a = O[a]) ? L.isShader(a) : 0, emscripten_glIsTexture:a => 
(a = Yb[a]) ? L.isTexture(a) : 0, emscripten_glIsVertexArrayOES:a => (a = Zb[a]) ? L.isVertexArray(a) : 0, emscripten_glLineWidth:a => L.lineWidth(a), emscripten_glLinkProgram:gd, emscripten_glPixelStorei:hd, emscripten_glPolygonModeWEBGL:(a, b) => {
  L.rb.polygonModeWEBGL(a, b);
}, emscripten_glPolygonOffset:(a, b) => L.polygonOffset(a, b), emscripten_glPolygonOffsetClampEXT:(a, b, c) => {
  L.eb.polygonOffsetClampEXT(a, b, c);
}, emscripten_glQueryCounterEXT:(a, b) => {
  L.B.queryCounterEXT(P[a], b);
}, emscripten_glReadPixels:kd, emscripten_glReleaseShaderCompiler:() => {
}, emscripten_glRenderbufferStorage:(a, b, c, d) => L.renderbufferStorage(a, b, c, d), emscripten_glSampleCoverage:(a, b) => {
  L.sampleCoverage(a, !!b);
}, emscripten_glScissor:(a, b, c, d) => L.scissor(a, b, c, d), emscripten_glShaderBinary:() => {
  Q ||= 1280;
}, emscripten_glShaderSource:ld, emscripten_glStencilFunc:(a, b, c) => L.stencilFunc(a, b, c), emscripten_glStencilFuncSeparate:(a, b, c, d) => L.stencilFuncSeparate(a, b, c, d), emscripten_glStencilMask:a => L.stencilMask(a), emscripten_glStencilMaskSeparate:(a, b) => L.stencilMaskSeparate(a, b), emscripten_glStencilOp:(a, b, c) => L.stencilOp(a, b, c), emscripten_glStencilOpSeparate:(a, b, c, d) => L.stencilOpSeparate(a, b, c, d), emscripten_glTexImage2D:md, emscripten_glTexParameterf:(a, b, c) => 
L.texParameterf(a, b, c), emscripten_glTexParameterfv:(a, b, c) => {
  L.texParameterf(a, b, v[c >> 2]);
}, emscripten_glTexParameteri:nd, emscripten_glTexParameteriv:(a, b, c) => {
  L.texParameteri(a, b, r[c >> 2]);
}, emscripten_glTexSubImage2D:(a, b, c, d, e, f, g, l, p) => {
  p = p ? jd(l, g, e, f, p) : null;
  L.texSubImage2D(a, b, c, d, e, f, g, l, p);
}, emscripten_glUniform1f:(a, b) => {
  L.uniform1f(S(a), b);
}, emscripten_glUniform1fv:(a, b, c) => {
  if (288 >= b) {
    for (var d = od[b], e = 0; e < b; ++e) {
      d[e] = v[c + 4 * e >> 2];
    }
  } else {
    d = v.subarray(c >> 2, c + 4 * b >> 2);
  }
  L.uniform1fv(S(a), d);
}, emscripten_glUniform1i:pd, emscripten_glUniform1iv:(a, b, c) => {
  if (288 >= b) {
    for (var d = qd[b], e = 0; e < b; ++e) {
      d[e] = r[c + 4 * e >> 2];
    }
  } else {
    d = r.subarray(c >> 2, c + 4 * b >> 2);
  }
  L.uniform1iv(S(a), d);
}, emscripten_glUniform2f:(a, b, c) => {
  L.uniform2f(S(a), b, c);
}, emscripten_glUniform2fv:(a, b, c) => {
  if (144 >= b) {
    b *= 2;
    for (var d = od[b], e = 0; e < b; e += 2) {
      d[e] = v[c + 4 * e >> 2], d[e + 1] = v[c + (4 * e + 4) >> 2];
    }
  } else {
    d = v.subarray(c >> 2, c + 8 * b >> 2);
  }
  L.uniform2fv(S(a), d);
}, emscripten_glUniform2i:(a, b, c) => {
  L.uniform2i(S(a), b, c);
}, emscripten_glUniform2iv:(a, b, c) => {
  if (144 >= b) {
    b *= 2;
    for (var d = qd[b], e = 0; e < b; e += 2) {
      d[e] = r[c + 4 * e >> 2], d[e + 1] = r[c + (4 * e + 4) >> 2];
    }
  } else {
    d = r.subarray(c >> 2, c + 8 * b >> 2);
  }
  L.uniform2iv(S(a), d);
}, emscripten_glUniform3f:(a, b, c, d) => {
  L.uniform3f(S(a), b, c, d);
}, emscripten_glUniform3fv:(a, b, c) => {
  if (96 >= b) {
    b *= 3;
    for (var d = od[b], e = 0; e < b; e += 3) {
      d[e] = v[c + 4 * e >> 2], d[e + 1] = v[c + (4 * e + 4) >> 2], d[e + 2] = v[c + (4 * e + 8) >> 2];
    }
  } else {
    d = v.subarray(c >> 2, c + 12 * b >> 2);
  }
  L.uniform3fv(S(a), d);
}, emscripten_glUniform3i:(a, b, c, d) => {
  L.uniform3i(S(a), b, c, d);
}, emscripten_glUniform3iv:(a, b, c) => {
  if (96 >= b) {
    b *= 3;
    for (var d = qd[b], e = 0; e < b; e += 3) {
      d[e] = r[c + 4 * e >> 2], d[e + 1] = r[c + (4 * e + 4) >> 2], d[e + 2] = r[c + (4 * e + 8) >> 2];
    }
  } else {
    d = r.subarray(c >> 2, c + 12 * b >> 2);
  }
  L.uniform3iv(S(a), d);
}, emscripten_glUniform4f:rd, emscripten_glUniform4fv:(a, b, c) => {
  if (72 >= b) {
    var d = od[4 * b], e = v;
    c >>= 2;
    b *= 4;
    for (var f = 0; f < b; f += 4) {
      var g = c + f;
      d[f] = e[g];
      d[f + 1] = e[g + 1];
      d[f + 2] = e[g + 2];
      d[f + 3] = e[g + 3];
    }
  } else {
    d = v.subarray(c >> 2, c + 16 * b >> 2);
  }
  L.uniform4fv(S(a), d);
}, emscripten_glUniform4i:(a, b, c, d, e) => {
  L.uniform4i(S(a), b, c, d, e);
}, emscripten_glUniform4iv:(a, b, c) => {
  if (72 >= b) {
    b *= 4;
    for (var d = qd[b], e = 0; e < b; e += 4) {
      d[e] = r[c + 4 * e >> 2], d[e + 1] = r[c + (4 * e + 4) >> 2], d[e + 2] = r[c + (4 * e + 8) >> 2], d[e + 3] = r[c + (4 * e + 12) >> 2];
    }
  } else {
    d = r.subarray(c >> 2, c + 16 * b >> 2);
  }
  L.uniform4iv(S(a), d);
}, emscripten_glUniformMatrix2fv:(a, b, c, d) => {
  if (72 >= b) {
    b *= 4;
    for (var e = od[b], f = 0; f < b; f += 4) {
      e[f] = v[d + 4 * f >> 2], e[f + 1] = v[d + (4 * f + 4) >> 2], e[f + 2] = v[d + (4 * f + 8) >> 2], e[f + 3] = v[d + (4 * f + 12) >> 2];
    }
  } else {
    e = v.subarray(d >> 2, d + 16 * b >> 2);
  }
  L.uniformMatrix2fv(S(a), !!c, e);
}, emscripten_glUniformMatrix3fv:(a, b, c, d) => {
  if (32 >= b) {
    b *= 9;
    for (var e = od[b], f = 0; f < b; f += 9) {
      e[f] = v[d + 4 * f >> 2], e[f + 1] = v[d + (4 * f + 4) >> 2], e[f + 2] = v[d + (4 * f + 8) >> 2], e[f + 3] = v[d + (4 * f + 12) >> 2], e[f + 4] = v[d + (4 * f + 16) >> 2], e[f + 5] = v[d + (4 * f + 20) >> 2], e[f + 6] = v[d + (4 * f + 24) >> 2], e[f + 7] = v[d + (4 * f + 28) >> 2], e[f + 8] = v[d + (4 * f + 32) >> 2];
    }
  } else {
    e = v.subarray(d >> 2, d + 36 * b >> 2);
  }
  L.uniformMatrix3fv(S(a), !!c, e);
}, emscripten_glUniformMatrix4fv:sd, emscripten_glUseProgram:td, emscripten_glValidateProgram:a => {
  L.validateProgram(N[a]);
}, emscripten_glVertexAttrib1f:(a, b) => L.vertexAttrib1f(a, b), emscripten_glVertexAttrib1fv:(a, b) => {
  L.vertexAttrib1f(a, v[b >> 2]);
}, emscripten_glVertexAttrib2f:(a, b, c) => L.vertexAttrib2f(a, b, c), emscripten_glVertexAttrib2fv:(a, b) => {
  L.vertexAttrib2f(a, v[b >> 2], v[b + 4 >> 2]);
}, emscripten_glVertexAttrib3f:(a, b, c, d) => L.vertexAttrib3f(a, b, c, d), emscripten_glVertexAttrib3fv:(a, b) => {
  L.vertexAttrib3f(a, v[b >> 2], v[b + 4 >> 2], v[b + 8 >> 2]);
}, emscripten_glVertexAttrib4f:(a, b, c, d, e) => L.vertexAttrib4f(a, b, c, d, e), emscripten_glVertexAttrib4fv:(a, b) => {
  L.vertexAttrib4f(a, v[b >> 2], v[b + 4 >> 2], v[b + 8 >> 2], v[b + 12 >> 2]);
}, emscripten_glVertexAttribDivisorANGLE:(a, b) => {
  L.vertexAttribDivisor(a, b);
}, emscripten_glVertexAttribPointer:ud, emscripten_glViewport:vd, emscripten_resize_heap:() => {
  ua("OOM");
}, emscripten_sample_gamepad_data:wd, emscripten_set_blur_callback_on_thread:(a, b, c, d) => xd(a, b, c, d, 12, "blur"), emscripten_set_canvas_element_size:(a, b, c) => {
  a = J(a);
  if (!a) {
    return -4;
  }
  a.width = b;
  a.height = c;
  return 0;
}, emscripten_set_click_callback_on_thread:(a, b, c, d) => yd(a, b, c, d, 4, "click"), emscripten_set_focus_callback_on_thread:(a, b, c, d) => xd(a, b, c, d, 13, "focus"), emscripten_set_fullscreenchange_callback_on_thread:(a, b, c, d) => {
  if (!K.fullscreenEnabled()) {
    return -1;
  }
  a = J(a);
  if (!a) {
    return -4;
  }
  Ad(a, b, c, d, "webkitfullscreenchange");
  return Ad(a, b, c, d, "fullscreenchange");
}, emscripten_set_gamepadconnected_callback_on_thread:(a, b, c) => wd() ? -1 : Bd(a, b, c, 26, "gamepadconnected"), emscripten_set_gamepaddisconnected_callback_on_thread:(a, b, c) => wd() ? -1 : Bd(a, b, c, 27, "gamepaddisconnected"), emscripten_set_main_loop:(a, b, c) => {
  Zd(() => dynCall_v(a), b, c);
}, emscripten_set_mousemove_callback_on_thread:(a, b, c, d) => yd(a, b, c, d, 8, "mousemove"), emscripten_set_pointerlockchange_callback_on_thread:(a, b, c, d) => document.body?.requestPointerLock ? (a = J(a)) ? $d(a, b, c, d) : -4 : -1, emscripten_set_resize_callback_on_thread:(a, b, c, d) => ae(a, b, c, d), emscripten_set_touchcancel_callback_on_thread:(a, b, c, d) => be(a, b, c, d, 25, "touchcancel"), emscripten_set_touchend_callback_on_thread:(a, b, c, d) => be(a, b, c, d, 23, "touchend"), emscripten_set_touchmove_callback_on_thread:(a, 
b, c, d) => be(a, b, c, d, 24, "touchmove"), emscripten_set_touchstart_callback_on_thread:(a, b, c, d) => be(a, b, c, d, 22, "touchstart"), emscripten_set_visibilitychange_callback_on_thread:(a, b, c) => Jb[1] ? ce(a, b, c) : -4, emscripten_set_window_title:a => document.title = a ? y(n, a) : "", exit:a => {
  qa = a;
  Dd(a);
}, fd_close:function(a) {
  try {
    var b = E(a);
    zb(b);
    return 0;
  } catch (c) {
    if ("undefined" == typeof H || "ErrnoError" !== c.name) {
      throw c;
    }
    return c.j;
  }
}, fd_read:function(a, b, c, d) {
  try {
    a: {
      var e = E(a);
      a = b;
      for (var f, g = b = 0; g < c; g++) {
        var l = t[a >> 2], p = t[a + 4 >> 2];
        a += 8;
        var q = e, u = l, z = p, x = f, G = m;
        if (0 > z || 0 > x) {
          throw new B(28);
        }
        if (null === q.fd) {
          throw new B(8);
        }
        if (1 === (q.flags & 2097155)) {
          throw new B(8);
        }
        if (16384 === (q.node.mode & 61440)) {
          throw new B(31);
        }
        if (!q.g.read) {
          throw new B(28);
        }
        var C = "undefined" != typeof x;
        if (!C) {
          x = q.position;
        } else if (!q.seekable) {
          throw new B(70);
        }
        var M = q.g.read(q, G, u, z, x);
        C || (q.position += M);
        var T = M;
        if (0 > T) {
          var pa = -1;
          break a;
        }
        b += T;
        if (T < p) {
          break;
        }
        "undefined" != typeof f && (f += T);
      }
      pa = b;
    }
    t[d >> 2] = pa;
    return 0;
  } catch (Sa) {
    if ("undefined" == typeof H || "ErrnoError" !== Sa.name) {
      throw Sa;
    }
    return Sa.j;
  }
}, fd_seek:function(a, b, c, d) {
  b = -9007199254740992 > b || 9007199254740992 < b ? NaN : Number(b);
  try {
    if (isNaN(b)) {
      return 61;
    }
    var e = E(a);
    Ab(e, b, c);
    ta[d >> 3] = BigInt(e.position);
    e.ua && 0 === b && 0 === c && (e.ua = null);
    return 0;
  } catch (f) {
    if ("undefined" == typeof H || "ErrnoError" !== f.name) {
      throw f;
    }
    return f.j;
  }
}, fd_write:function(a, b, c, d) {
  try {
    a: {
      var e = E(a);
      a = b;
      for (var f, g = b = 0; g < c; g++) {
        var l = t[a >> 2], p = t[a + 4 >> 2];
        a += 8;
        var q = Bb(e, m, l, p, f);
        if (0 > q) {
          var u = -1;
          break a;
        }
        b += q;
        if (q < p) {
          break;
        }
        "undefined" != typeof f && (f += q);
      }
      u = b;
    }
    t[d >> 2] = u;
    return 0;
  } catch (z) {
    if ("undefined" == typeof H || "ErrnoError" !== z.name) {
      throw z;
    }
    return z.j;
  }
}, glActiveTexture:jc, glAttachShader:kc, glBindAttribLocation:lc, glBindBuffer:mc, glBindTexture:nc, glBlendFunc:oc, glBufferData:pc, glBufferSubData:qc, glClear:rc, glClearColor:sc, glClearDepthf:tc, glCompileShader:uc, glCompressedTexImage2D:vc, glCreateProgram:wc, glCreateShader:xc, glCullFace:yc, glDeleteBuffers:zc, glDeleteProgram:Ac, glDeleteShader:Bc, glDeleteTextures:Cc, glDepthFunc:Dc, glDetachShader:Ec, glDisable:Fc, glDisableVertexAttribArray:Gc, glDrawArrays:Hc, glDrawElements:Jc, glEnable:Kc, 
glEnableVertexAttribArray:Lc, glFrontFace:Mc, glGenBuffers:Nc, glGenTextures:Oc, glGetAttribLocation:Qc, glGetFloatv:Sc, glGetProgramInfoLog:Tc, glGetProgramiv:Uc, glGetShaderInfoLog:Xc, glGetShaderiv:Yc, glGetString:ad, glGetUniformLocation:dd, glLinkProgram:gd, glPixelStorei:hd, glReadPixels:kd, glShaderSource:ld, glTexImage2D:md, glTexParameteri:nd, glUniform1i:pd, glUniform4f:rd, glUniformMatrix4fv:sd, glUseProgram:td, glVertexAttribPointer:ud, glViewport:vd, glfwCreateWindow:(a, b, c, d) => 
{
  var e;
  for (e = 0; e < X.length && null !== X[e]; e++) {
  }
  0 < e && ua("glfwCreateWindow only supports one window at time currently");
  var f = e + 1;
  if (0 >= a || 0 >= b) {
    f = 0;
  } else {
    d ? ne() : Be(a, b);
    for (e = 0; e < X.length && null == X[e]; e++) {
    }
    d = h.canvas;
    var g = 0 < ke[139265];
    e == X.length && (g ? je(d) : ge());
    !h.ctx && g ? f = 0 : (a = new Ce(f, a, b, d.width, d.height, c), f - 1 == X.length ? X.push(a) : X[f - 1] = a, Z = a, qf(), f = a.id);
  }
  return f;
}, glfwDefaultWindowHints:() => {
  ke = {...Ie};
}, glfwDestroyWindow:a => {
  a: {
    if (a = Y(a)) {
      a.Va && dynCall_vi(a.Va, a.id);
      X[a.id - 1] = null;
      Z.id == a.id && (Z = null);
      for (a of X) {
        if (null !== a) {
          a = void 0;
          break a;
        }
      }
      delete h.ctx;
    }
    a = void 0;
  }
  return a;
}, glfwGetPrimaryMonitor:() => 1, glfwGetTime:() => performance.now() / 1000 - Fe, glfwGetVideoModes:(a, b) => r[b >> 2] = 0, glfwInit:() => {
  if (X) {
    return 1;
  }
  Fe = performance.now() / 1000;
  ke = {...Ie};
  X = [];
  Z = null;
  Ee = pf();
  window.addEventListener("gamepadconnected", Pe, !0);
  window.addEventListener("gamepaddisconnected", Qe, !0);
  window.addEventListener("keydown", Re, !0);
  window.addEventListener("keypress", Le, !0);
  window.addEventListener("keyup", Se, !0);
  window.addEventListener("blur", Te, !0);
  Ge = window.matchMedia("(resolution: " + pf() + "dppx)");
  Ge.addEventListener("change", rf);
  var a = h.canvas;
  a.addEventListener("touchmove", Ve, !0);
  a.addEventListener("touchstart", $e, !0);
  a.addEventListener("touchcancel", af, !0);
  a.addEventListener("touchend", af, !0);
  a.addEventListener("mousemove", Ve, !0);
  a.addEventListener("mousedown", $e, !0);
  a.addEventListener("mouseup", af, !0);
  a.addEventListener("wheel", bf, !0);
  a.addEventListener("mousewheel", bf, !0);
  a.addEventListener("mouseenter", We, !0);
  a.addEventListener("mouseleave", Xe, !0);
  a.addEventListener("drop", jf, !0);
  a.addEventListener("dragover", kf, !0);
  ne = lf;
  we = of;
  qe = mf;
  ze.push((b, c) => {
    if (nf()) {
      var d = h.canvas;
      df(d.clientWidth, d.clientHeight, b, c);
    } else {
      df(b, c, b, c);
    }
  });
  return 1;
}, glfwMakeContextCurrent:() => 0, glfwSetCharCallback:(a, b) => {
  if (a = Y(a)) {
    var c = a.S;
    a.S = b;
    b = c;
  } else {
    b = null;
  }
  return b;
}, glfwSetCursorEnterCallback:(a, b) => {
  a = Y(a);
  if (!a) {
    return null;
  }
  var c = a.M;
  a.M = b;
  return c;
}, glfwSetCursorPosCallback:(a, b) => {
  if (a = Y(a)) {
    var c = a.O;
    a.O = b;
    b = c;
  } else {
    b = null;
  }
  return b;
}, glfwSetDropCallback:(a, b) => {
  if (a = Y(a)) {
    var c = a.P;
    a.P = b;
    b = c;
  } else {
    b = null;
  }
  return b;
}, glfwSetErrorCallback:a => {
  var b = De;
  De = a;
  return b;
}, glfwSetKeyCallback:(a, b) => {
  if (a = Y(a)) {
    var c = a.V;
    a.V = b;
    b = c;
  } else {
    b = null;
  }
  return b;
}, glfwSetMouseButtonCallback:(a, b) => {
  if (a = Y(a)) {
    var c = a.da;
    a.da = b;
    b = c;
  } else {
    b = null;
  }
  return b;
}, glfwSetScrollCallback:(a, b) => {
  if (a = Y(a)) {
    var c = a.ga;
    a.ga = b;
    b = c;
  } else {
    b = null;
  }
  return b;
}, glfwSetWindowContentScaleCallback:(a, b) => {
  a = Y(a);
  if (!a) {
    return null;
  }
  var c = a.ia;
  a.ia = b;
  return c;
}, glfwSetWindowFocusCallback:(a, b) => {
  a = Y(a);
  if (!a) {
    return null;
  }
  var c = a.Wa;
  a.Wa = b;
  return c;
}, glfwSetWindowIconifyCallback:(a, b) => {
  a = Y(a);
  if (!a) {
    return null;
  }
  var c = a.Xa;
  a.Xa = b;
  return c;
}, glfwSetWindowShouldClose:(a, b) => {
  if (a = Y(a)) {
    a.pb = b;
  }
}, glfwSetWindowSize:(a, b, c) => {
  (a = Y(a)) && Z.id == a.id && Be(b, c);
}, glfwSetWindowSizeCallback:(a, b) => {
  if (a = Y(a)) {
    var c = a.ja;
    a.ja = b;
    b = c;
  } else {
    b = null;
  }
  return b;
}, glfwSwapBuffers:() => {
}, glfwTerminate:() => {
  window.removeEventListener("gamepadconnected", Pe, !0);
  window.removeEventListener("gamepaddisconnected", Qe, !0);
  window.removeEventListener("keydown", Re, !0);
  window.removeEventListener("keypress", Le, !0);
  window.removeEventListener("keyup", Se, !0);
  window.removeEventListener("blur", Te, !0);
  var a = h.canvas;
  a.removeEventListener("touchmove", Ve, !0);
  a.removeEventListener("touchstart", $e, !0);
  a.removeEventListener("touchcancel", af, !0);
  a.removeEventListener("touchend", af, !0);
  a.removeEventListener("mousemove", Ve, !0);
  a.removeEventListener("mousedown", $e, !0);
  a.removeEventListener("mouseup", af, !0);
  a.removeEventListener("wheel", bf, !0);
  a.removeEventListener("mousewheel", bf, !0);
  a.removeEventListener("mouseenter", We, !0);
  a.removeEventListener("mouseleave", Xe, !0);
  a.removeEventListener("drop", jf, !0);
  a.removeEventListener("dragover", kf, !0);
  Ge && Ge.removeEventListener("change", rf);
  a.width = a.height = 1;
  Z = X = null;
}, glfwWindowHint:(a, b) => {
  ke[a] = b;
}, proc_exit:Dd};
function Hf(a = []) {
  var b = Ef;
  a.unshift(ea);
  var c = a.length, d = tf(4 * (c + 1)), e = d, f;
  for (f of a) {
    t[e >> 2] = uf(f), e += 4;
  }
  t[e >> 2] = 0;
  try {
    var g = b(c, d);
    qa = g;
    Dd(g);
  } catch (l) {
    Cd(l);
  }
}
function If(a = da) {
  function b() {
    h.calledRun = !0;
    if (!oa) {
      if (!h.noFSInit && !jb) {
        var c, d;
        jb = !0;
        c ??= h.stdin;
        d ??= h.stdout;
        e ??= h.stderr;
        c ? Db("stdin", c) : xb("/dev/tty", "/dev/stdin");
        d ? Db("stdout", null, d) : xb("/dev/tty", "/dev/stdout");
        e ? Db("stderr", null, e) : xb("/dev/tty1", "/dev/stderr");
        yb("/dev/stdin", 0);
        yb("/dev/stdout", 1);
        yb("/dev/stderr", 1);
      }
      Jf.__wasm_call_ctors();
      kb = !1;
      h.onRuntimeInitialized?.();
      h.noInitialRun || Hf(a);
      if (h.postRun) {
        for ("function" == typeof h.postRun && (h.postRun = [h.postRun]); h.postRun.length;) {
          var e = h.postRun.shift();
          Ba.push(e);
        }
      }
      Aa(Ba);
    }
  }
  if (0 < Ea) {
    Fa = If;
  } else {
    if (h.preRun) {
      for ("function" == typeof h.preRun && (h.preRun = [h.preRun]); h.preRun.length;) {
        Da();
      }
    }
    Aa(Ca);
    0 < Ea ? Fa = If : h.setStatus ? (h.setStatus("Running..."), setTimeout(() => {
      setTimeout(() => h.setStatus(""), 1);
      b();
    }, 1)) : b();
  }
}
var Jf;
(async function() {
  function a(c) {
    var d = Jf = c.exports;
    c = {};
    for (let [e, f] of Object.entries(d)) {
      "function" == typeof f ? (d = vf(f), c[e] = d) : c[e] = f;
    }
    c = Jf = c;
    hf = c.free;
    R = c.malloc;
    h._ma_device__on_notification_unlocked = c.ma_device__on_notification_unlocked;
    h._ma_malloc_emscripten = c.ma_malloc_emscripten;
    h._ma_free_emscripten = c.ma_free_emscripten;
    h._ma_device_process_pcm_frames_capture__webaudio = c.ma_device_process_pcm_frames_capture__webaudio;
    h._ma_device_process_pcm_frames_playback__webaudio = c.ma_device_process_pcm_frames_playback__webaudio;
    Ef = h._main = c.main;
    cb = c.emscripten_builtin_memalign;
    Cf = c._emscripten_stack_restore;
    tf = c._emscripten_stack_alloc;
    Bf = c.emscripten_stack_get_current;
    dynCall_vii = c.dynCall_vii;
    cf = c.dynCall_viii;
    sf = c.dynCall_viff;
    Me = c.dynCall_viiiii;
    Ye = c.dynCall_viiii;
    Ue = c.dynCall_vidd;
    U = c.dynCall_iiii;
    dynCall_vi = c.dynCall_vi;
    dynCall_v = c.dynCall_v;
    dynCall_iii = c.dynCall_iii;
    Ff = c.memory;
    c = Ff.buffer;
    m = new Int8Array(c);
    ra = new Int16Array(c);
    n = new Uint8Array(c);
    sa = new Uint16Array(c);
    r = new Int32Array(c);
    t = new Uint32Array(c);
    v = new Float32Array(c);
    w = new Float64Array(c);
    ta = new BigInt64Array(c);
    new BigUint64Array(c);
    Ea--;
    h.monitorRunDependencies?.(Ea);
    0 == Ea && Fa && (c = Fa, Fa = null, c());
    return Jf;
  }
  Ea++;
  h.monitorRunDependencies?.(Ea);
  var b = {env:Gf, wasi_snapshot_preview1:Gf};
  if (h.instantiateWasm) {
    return new Promise(c => {
      h.instantiateWasm(b, (d, e) => {
        c(a(d, e));
      });
    });
  }
  va ??= h.locateFile ? h.locateFile("index.wasm", ia) : ia + "index.wasm";
  return a((await ya(b)).instance);
})();
If();

