(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var exports, module, marked;

(function(){

//////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                              //
// packages/chuangbo_marked/packages/chuangbo_marked.js                                         //
//                                                                                              //
//////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                //
(function () {                                                                                  // 1
                                                                                                // 2
//////////////////////////////////////////////////////////////////////////////////////////      // 3
//                                                                                      //      // 4
// packages/chuangbo:marked/pre-marked.js                                               //      // 5
//                                                                                      //      // 6
//////////////////////////////////////////////////////////////////////////////////////////      // 7
                                                                                        //      // 8
exports = {};                                                                           // 1    // 9
module = {};                                                                            // 2    // 10
//////////////////////////////////////////////////////////////////////////////////////////      // 11
                                                                                                // 12
}).call(this);                                                                                  // 13
                                                                                                // 14
                                                                                                // 15
                                                                                                // 16
                                                                                                // 17
                                                                                                // 18
                                                                                                // 19
(function () {                                                                                  // 20
                                                                                                // 21
//////////////////////////////////////////////////////////////////////////////////////////      // 22
//                                                                                      //      // 23
// packages/chuangbo:marked/marked/lib/marked.js                                        //      // 24
//                                                                                      //      // 25
//////////////////////////////////////////////////////////////////////////////////////////      // 26
                                                                                        //      // 27
/**                                                                                     // 1    // 28
 * marked - a markdown parser                                                           // 2    // 29
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)                         // 3    // 30
 * https://github.com/chjj/marked                                                       // 4    // 31
 */                                                                                     // 5    // 32
                                                                                        // 6    // 33
;(function() {                                                                          // 7    // 34
                                                                                        // 8    // 35
/**                                                                                     // 9    // 36
 * Block-Level Grammar                                                                  // 10   // 37
 */                                                                                     // 11   // 38
                                                                                        // 12   // 39
var block = {                                                                           // 13   // 40
  newline: /^\n+/,                                                                      // 14   // 41
  code: /^( {4}[^\n]+\n*)+/,                                                            // 15   // 42
  fences: noop,                                                                         // 16   // 43
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,                                                      // 17   // 44
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,                                     // 18   // 45
  nptable: noop,                                                                        // 19   // 46
  lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,                                        // 20   // 47
  blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,                                     // 21   // 48
  list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,                // 22   // 49
  html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/, // 23   // 50
  def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,             // 24   // 51
  table: noop,                                                                          // 25   // 52
  paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,          // 26   // 53
  text: /^[^\n]+/                                                                       // 27   // 54
};                                                                                      // 28   // 55
                                                                                        // 29   // 56
block.bullet = /(?:[*+-]|\d+\.)/;                                                       // 30   // 57
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;                              // 31   // 58
block.item = replace(block.item, 'gm')                                                  // 32   // 59
  (/bull/g, block.bullet)                                                               // 33   // 60
  ();                                                                                   // 34   // 61
                                                                                        // 35   // 62
block.list = replace(block.list)                                                        // 36   // 63
  (/bull/g, block.bullet)                                                               // 37   // 64
  ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')                                       // 38   // 65
  ('def', '\\n+(?=' + block.def.source + ')')                                           // 39   // 66
  ();                                                                                   // 40   // 67
                                                                                        // 41   // 68
block.blockquote = replace(block.blockquote)                                            // 42   // 69
  ('def', block.def)                                                                    // 43   // 70
  ();                                                                                   // 44   // 71
                                                                                        // 45   // 72
block._tag = '(?!(?:'                                                                   // 46   // 73
  + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'                                // 47   // 74
  + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'                               // 48   // 75
  + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';                          // 49   // 76
                                                                                        // 50   // 77
block.html = replace(block.html)                                                        // 51   // 78
  ('comment', /<!--[\s\S]*?-->/)                                                        // 52   // 79
  ('closed', /<(tag)[\s\S]+?<\/\1>/)                                                    // 53   // 80
  ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)                                      // 54   // 81
  (/tag/g, block._tag)                                                                  // 55   // 82
  ();                                                                                   // 56   // 83
                                                                                        // 57   // 84
block.paragraph = replace(block.paragraph)                                              // 58   // 85
  ('hr', block.hr)                                                                      // 59   // 86
  ('heading', block.heading)                                                            // 60   // 87
  ('lheading', block.lheading)                                                          // 61   // 88
  ('blockquote', block.blockquote)                                                      // 62   // 89
  ('tag', '<' + block._tag)                                                             // 63   // 90
  ('def', block.def)                                                                    // 64   // 91
  ();                                                                                   // 65   // 92
                                                                                        // 66   // 93
/**                                                                                     // 67   // 94
 * Normal Block Grammar                                                                 // 68   // 95
 */                                                                                     // 69   // 96
                                                                                        // 70   // 97
block.normal = merge({}, block);                                                        // 71   // 98
                                                                                        // 72   // 99
/**                                                                                     // 73   // 100
 * GFM Block Grammar                                                                    // 74   // 101
 */                                                                                     // 75   // 102
                                                                                        // 76   // 103
block.gfm = merge({}, block.normal, {                                                   // 77   // 104
  fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,                 // 78   // 105
  paragraph: /^/,                                                                       // 79   // 106
  heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/                                      // 80   // 107
});                                                                                     // 81   // 108
                                                                                        // 82   // 109
block.gfm.paragraph = replace(block.paragraph)                                          // 83   // 110
  ('(?!', '(?!'                                                                         // 84   // 111
    + block.gfm.fences.source.replace('\\1', '\\2') + '|'                               // 85   // 112
    + block.list.source.replace('\\1', '\\3') + '|')                                    // 86   // 113
  ();                                                                                   // 87   // 114
                                                                                        // 88   // 115
/**                                                                                     // 89   // 116
 * GFM + Tables Block Grammar                                                           // 90   // 117
 */                                                                                     // 91   // 118
                                                                                        // 92   // 119
block.tables = merge({}, block.gfm, {                                                   // 93   // 120
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,             // 94   // 121
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/                    // 95   // 122
});                                                                                     // 96   // 123
                                                                                        // 97   // 124
/**                                                                                     // 98   // 125
 * Block Lexer                                                                          // 99   // 126
 */                                                                                     // 100  // 127
                                                                                        // 101  // 128
function Lexer(options) {                                                               // 102  // 129
  this.tokens = [];                                                                     // 103  // 130
  this.tokens.links = {};                                                               // 104  // 131
  this.options = options || marked.defaults;                                            // 105  // 132
  this.rules = block.normal;                                                            // 106  // 133
                                                                                        // 107  // 134
  if (this.options.gfm) {                                                               // 108  // 135
    if (this.options.tables) {                                                          // 109  // 136
      this.rules = block.tables;                                                        // 110  // 137
    } else {                                                                            // 111  // 138
      this.rules = block.gfm;                                                           // 112  // 139
    }                                                                                   // 113  // 140
  }                                                                                     // 114  // 141
}                                                                                       // 115  // 142
                                                                                        // 116  // 143
/**                                                                                     // 117  // 144
 * Expose Block Rules                                                                   // 118  // 145
 */                                                                                     // 119  // 146
                                                                                        // 120  // 147
Lexer.rules = block;                                                                    // 121  // 148
                                                                                        // 122  // 149
/**                                                                                     // 123  // 150
 * Static Lex Method                                                                    // 124  // 151
 */                                                                                     // 125  // 152
                                                                                        // 126  // 153
Lexer.lex = function(src, options) {                                                    // 127  // 154
  var lexer = new Lexer(options);                                                       // 128  // 155
  return lexer.lex(src);                                                                // 129  // 156
};                                                                                      // 130  // 157
                                                                                        // 131  // 158
/**                                                                                     // 132  // 159
 * Preprocessing                                                                        // 133  // 160
 */                                                                                     // 134  // 161
                                                                                        // 135  // 162
Lexer.prototype.lex = function(src) {                                                   // 136  // 163
  src = src                                                                             // 137  // 164
    .replace(/\r\n|\r/g, '\n')                                                          // 138  // 165
    .replace(/\t/g, '    ')                                                             // 139  // 166
    .replace(/\u00a0/g, ' ')                                                            // 140  // 167
    .replace(/\u2424/g, '\n');                                                          // 141  // 168
                                                                                        // 142  // 169
  return this.token(src, true);                                                         // 143  // 170
};                                                                                      // 144  // 171
                                                                                        // 145  // 172
/**                                                                                     // 146  // 173
 * Lexing                                                                               // 147  // 174
 */                                                                                     // 148  // 175
                                                                                        // 149  // 176
Lexer.prototype.token = function(src, top, bq) {                                        // 150  // 177
  var src = src.replace(/^ +$/gm, '')                                                   // 151  // 178
    , next                                                                              // 152  // 179
    , loose                                                                             // 153  // 180
    , cap                                                                               // 154  // 181
    , bull                                                                              // 155  // 182
    , b                                                                                 // 156  // 183
    , item                                                                              // 157  // 184
    , space                                                                             // 158  // 185
    , i                                                                                 // 159  // 186
    , l;                                                                                // 160  // 187
                                                                                        // 161  // 188
  while (src) {                                                                         // 162  // 189
    // newline                                                                          // 163  // 190
    if (cap = this.rules.newline.exec(src)) {                                           // 164  // 191
      src = src.substring(cap[0].length);                                               // 165  // 192
      if (cap[0].length > 1) {                                                          // 166  // 193
        this.tokens.push({                                                              // 167  // 194
          type: 'space'                                                                 // 168  // 195
        });                                                                             // 169  // 196
      }                                                                                 // 170  // 197
    }                                                                                   // 171  // 198
                                                                                        // 172  // 199
    // code                                                                             // 173  // 200
    if (cap = this.rules.code.exec(src)) {                                              // 174  // 201
      src = src.substring(cap[0].length);                                               // 175  // 202
      cap = cap[0].replace(/^ {4}/gm, '');                                              // 176  // 203
      this.tokens.push({                                                                // 177  // 204
        type: 'code',                                                                   // 178  // 205
        text: !this.options.pedantic                                                    // 179  // 206
          ? cap.replace(/\n+$/, '')                                                     // 180  // 207
          : cap                                                                         // 181  // 208
      });                                                                               // 182  // 209
      continue;                                                                         // 183  // 210
    }                                                                                   // 184  // 211
                                                                                        // 185  // 212
    // fences (gfm)                                                                     // 186  // 213
    if (cap = this.rules.fences.exec(src)) {                                            // 187  // 214
      src = src.substring(cap[0].length);                                               // 188  // 215
      this.tokens.push({                                                                // 189  // 216
        type: 'code',                                                                   // 190  // 217
        lang: cap[2],                                                                   // 191  // 218
        text: cap[3] || ''                                                              // 192  // 219
      });                                                                               // 193  // 220
      continue;                                                                         // 194  // 221
    }                                                                                   // 195  // 222
                                                                                        // 196  // 223
    // heading                                                                          // 197  // 224
    if (cap = this.rules.heading.exec(src)) {                                           // 198  // 225
      src = src.substring(cap[0].length);                                               // 199  // 226
      this.tokens.push({                                                                // 200  // 227
        type: 'heading',                                                                // 201  // 228
        depth: cap[1].length,                                                           // 202  // 229
        text: cap[2]                                                                    // 203  // 230
      });                                                                               // 204  // 231
      continue;                                                                         // 205  // 232
    }                                                                                   // 206  // 233
                                                                                        // 207  // 234
    // table no leading pipe (gfm)                                                      // 208  // 235
    if (top && (cap = this.rules.nptable.exec(src))) {                                  // 209  // 236
      src = src.substring(cap[0].length);                                               // 210  // 237
                                                                                        // 211  // 238
      item = {                                                                          // 212  // 239
        type: 'table',                                                                  // 213  // 240
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),                     // 214  // 241
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),                        // 215  // 242
        cells: cap[3].replace(/\n$/, '').split('\n')                                    // 216  // 243
      };                                                                                // 217  // 244
                                                                                        // 218  // 245
      for (i = 0; i < item.align.length; i++) {                                         // 219  // 246
        if (/^ *-+: *$/.test(item.align[i])) {                                          // 220  // 247
          item.align[i] = 'right';                                                      // 221  // 248
        } else if (/^ *:-+: *$/.test(item.align[i])) {                                  // 222  // 249
          item.align[i] = 'center';                                                     // 223  // 250
        } else if (/^ *:-+ *$/.test(item.align[i])) {                                   // 224  // 251
          item.align[i] = 'left';                                                       // 225  // 252
        } else {                                                                        // 226  // 253
          item.align[i] = null;                                                         // 227  // 254
        }                                                                               // 228  // 255
      }                                                                                 // 229  // 256
                                                                                        // 230  // 257
      for (i = 0; i < item.cells.length; i++) {                                         // 231  // 258
        item.cells[i] = item.cells[i].split(/ *\| */);                                  // 232  // 259
      }                                                                                 // 233  // 260
                                                                                        // 234  // 261
      this.tokens.push(item);                                                           // 235  // 262
                                                                                        // 236  // 263
      continue;                                                                         // 237  // 264
    }                                                                                   // 238  // 265
                                                                                        // 239  // 266
    // lheading                                                                         // 240  // 267
    if (cap = this.rules.lheading.exec(src)) {                                          // 241  // 268
      src = src.substring(cap[0].length);                                               // 242  // 269
      this.tokens.push({                                                                // 243  // 270
        type: 'heading',                                                                // 244  // 271
        depth: cap[2] === '=' ? 1 : 2,                                                  // 245  // 272
        text: cap[1]                                                                    // 246  // 273
      });                                                                               // 247  // 274
      continue;                                                                         // 248  // 275
    }                                                                                   // 249  // 276
                                                                                        // 250  // 277
    // hr                                                                               // 251  // 278
    if (cap = this.rules.hr.exec(src)) {                                                // 252  // 279
      src = src.substring(cap[0].length);                                               // 253  // 280
      this.tokens.push({                                                                // 254  // 281
        type: 'hr'                                                                      // 255  // 282
      });                                                                               // 256  // 283
      continue;                                                                         // 257  // 284
    }                                                                                   // 258  // 285
                                                                                        // 259  // 286
    // blockquote                                                                       // 260  // 287
    if (cap = this.rules.blockquote.exec(src)) {                                        // 261  // 288
      src = src.substring(cap[0].length);                                               // 262  // 289
                                                                                        // 263  // 290
      this.tokens.push({                                                                // 264  // 291
        type: 'blockquote_start'                                                        // 265  // 292
      });                                                                               // 266  // 293
                                                                                        // 267  // 294
      cap = cap[0].replace(/^ *> ?/gm, '');                                             // 268  // 295
                                                                                        // 269  // 296
      // Pass `top` to keep the current                                                 // 270  // 297
      // "toplevel" state. This is exactly                                              // 271  // 298
      // how markdown.pl works.                                                         // 272  // 299
      this.token(cap, top, true);                                                       // 273  // 300
                                                                                        // 274  // 301
      this.tokens.push({                                                                // 275  // 302
        type: 'blockquote_end'                                                          // 276  // 303
      });                                                                               // 277  // 304
                                                                                        // 278  // 305
      continue;                                                                         // 279  // 306
    }                                                                                   // 280  // 307
                                                                                        // 281  // 308
    // list                                                                             // 282  // 309
    if (cap = this.rules.list.exec(src)) {                                              // 283  // 310
      src = src.substring(cap[0].length);                                               // 284  // 311
      bull = cap[2];                                                                    // 285  // 312
                                                                                        // 286  // 313
      this.tokens.push({                                                                // 287  // 314
        type: 'list_start',                                                             // 288  // 315
        ordered: bull.length > 1                                                        // 289  // 316
      });                                                                               // 290  // 317
                                                                                        // 291  // 318
      // Get each top-level item.                                                       // 292  // 319
      cap = cap[0].match(this.rules.item);                                              // 293  // 320
                                                                                        // 294  // 321
      next = false;                                                                     // 295  // 322
      l = cap.length;                                                                   // 296  // 323
      i = 0;                                                                            // 297  // 324
                                                                                        // 298  // 325
      for (; i < l; i++) {                                                              // 299  // 326
        item = cap[i];                                                                  // 300  // 327
                                                                                        // 301  // 328
        // Remove the list item's bullet                                                // 302  // 329
        // so it is seen as the next token.                                             // 303  // 330
        space = item.length;                                                            // 304  // 331
        item = item.replace(/^ *([*+-]|\d+\.) +/, '');                                  // 305  // 332
                                                                                        // 306  // 333
        // Outdent whatever the                                                         // 307  // 334
        // list item contains. Hacky.                                                   // 308  // 335
        if (~item.indexOf('\n ')) {                                                     // 309  // 336
          space -= item.length;                                                         // 310  // 337
          item = !this.options.pedantic                                                 // 311  // 338
            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')                 // 312  // 339
            : item.replace(/^ {1,4}/gm, '');                                            // 313  // 340
        }                                                                               // 314  // 341
                                                                                        // 315  // 342
        // Determine whether the next list item belongs here.                           // 316  // 343
        // Backpedal if it does not belong in this list.                                // 317  // 344
        if (this.options.smartLists && i !== l - 1) {                                   // 318  // 345
          b = block.bullet.exec(cap[i + 1])[0];                                         // 319  // 346
          if (bull !== b && !(bull.length > 1 && b.length > 1)) {                       // 320  // 347
            src = cap.slice(i + 1).join('\n') + src;                                    // 321  // 348
            i = l - 1;                                                                  // 322  // 349
          }                                                                             // 323  // 350
        }                                                                               // 324  // 351
                                                                                        // 325  // 352
        // Determine whether item is loose or not.                                      // 326  // 353
        // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/                                         // 327  // 354
        // for discount behavior.                                                       // 328  // 355
        loose = next || /\n\n(?!\s*$)/.test(item);                                      // 329  // 356
        if (i !== l - 1) {                                                              // 330  // 357
          next = item.charAt(item.length - 1) === '\n';                                 // 331  // 358
          if (!loose) loose = next;                                                     // 332  // 359
        }                                                                               // 333  // 360
                                                                                        // 334  // 361
        this.tokens.push({                                                              // 335  // 362
          type: loose                                                                   // 336  // 363
            ? 'loose_item_start'                                                        // 337  // 364
            : 'list_item_start'                                                         // 338  // 365
        });                                                                             // 339  // 366
                                                                                        // 340  // 367
        // Recurse.                                                                     // 341  // 368
        this.token(item, false, bq);                                                    // 342  // 369
                                                                                        // 343  // 370
        this.tokens.push({                                                              // 344  // 371
          type: 'list_item_end'                                                         // 345  // 372
        });                                                                             // 346  // 373
      }                                                                                 // 347  // 374
                                                                                        // 348  // 375
      this.tokens.push({                                                                // 349  // 376
        type: 'list_end'                                                                // 350  // 377
      });                                                                               // 351  // 378
                                                                                        // 352  // 379
      continue;                                                                         // 353  // 380
    }                                                                                   // 354  // 381
                                                                                        // 355  // 382
    // html                                                                             // 356  // 383
    if (cap = this.rules.html.exec(src)) {                                              // 357  // 384
      src = src.substring(cap[0].length);                                               // 358  // 385
      this.tokens.push({                                                                // 359  // 386
        type: this.options.sanitize                                                     // 360  // 387
          ? 'paragraph'                                                                 // 361  // 388
          : 'html',                                                                     // 362  // 389
        pre: !this.options.sanitizer                                                    // 363  // 390
          && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),           // 364  // 391
        text: cap[0]                                                                    // 365  // 392
      });                                                                               // 366  // 393
      continue;                                                                         // 367  // 394
    }                                                                                   // 368  // 395
                                                                                        // 369  // 396
    // def                                                                              // 370  // 397
    if ((!bq && top) && (cap = this.rules.def.exec(src))) {                             // 371  // 398
      src = src.substring(cap[0].length);                                               // 372  // 399
      this.tokens.links[cap[1].toLowerCase()] = {                                       // 373  // 400
        href: cap[2],                                                                   // 374  // 401
        title: cap[3]                                                                   // 375  // 402
      };                                                                                // 376  // 403
      continue;                                                                         // 377  // 404
    }                                                                                   // 378  // 405
                                                                                        // 379  // 406
    // table (gfm)                                                                      // 380  // 407
    if (top && (cap = this.rules.table.exec(src))) {                                    // 381  // 408
      src = src.substring(cap[0].length);                                               // 382  // 409
                                                                                        // 383  // 410
      item = {                                                                          // 384  // 411
        type: 'table',                                                                  // 385  // 412
        header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),                     // 386  // 413
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),                        // 387  // 414
        cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')                         // 388  // 415
      };                                                                                // 389  // 416
                                                                                        // 390  // 417
      for (i = 0; i < item.align.length; i++) {                                         // 391  // 418
        if (/^ *-+: *$/.test(item.align[i])) {                                          // 392  // 419
          item.align[i] = 'right';                                                      // 393  // 420
        } else if (/^ *:-+: *$/.test(item.align[i])) {                                  // 394  // 421
          item.align[i] = 'center';                                                     // 395  // 422
        } else if (/^ *:-+ *$/.test(item.align[i])) {                                   // 396  // 423
          item.align[i] = 'left';                                                       // 397  // 424
        } else {                                                                        // 398  // 425
          item.align[i] = null;                                                         // 399  // 426
        }                                                                               // 400  // 427
      }                                                                                 // 401  // 428
                                                                                        // 402  // 429
      for (i = 0; i < item.cells.length; i++) {                                         // 403  // 430
        item.cells[i] = item.cells[i]                                                   // 404  // 431
          .replace(/^ *\| *| *\| *$/g, '')                                              // 405  // 432
          .split(/ *\| */);                                                             // 406  // 433
      }                                                                                 // 407  // 434
                                                                                        // 408  // 435
      this.tokens.push(item);                                                           // 409  // 436
                                                                                        // 410  // 437
      continue;                                                                         // 411  // 438
    }                                                                                   // 412  // 439
                                                                                        // 413  // 440
    // top-level paragraph                                                              // 414  // 441
    if (top && (cap = this.rules.paragraph.exec(src))) {                                // 415  // 442
      src = src.substring(cap[0].length);                                               // 416  // 443
      this.tokens.push({                                                                // 417  // 444
        type: 'paragraph',                                                              // 418  // 445
        text: cap[1].charAt(cap[1].length - 1) === '\n'                                 // 419  // 446
          ? cap[1].slice(0, -1)                                                         // 420  // 447
          : cap[1]                                                                      // 421  // 448
      });                                                                               // 422  // 449
      continue;                                                                         // 423  // 450
    }                                                                                   // 424  // 451
                                                                                        // 425  // 452
    // text                                                                             // 426  // 453
    if (cap = this.rules.text.exec(src)) {                                              // 427  // 454
      // Top-level should never reach here.                                             // 428  // 455
      src = src.substring(cap[0].length);                                               // 429  // 456
      this.tokens.push({                                                                // 430  // 457
        type: 'text',                                                                   // 431  // 458
        text: cap[0]                                                                    // 432  // 459
      });                                                                               // 433  // 460
      continue;                                                                         // 434  // 461
    }                                                                                   // 435  // 462
                                                                                        // 436  // 463
    if (src) {                                                                          // 437  // 464
      throw new                                                                         // 438  // 465
        Error('Infinite loop on byte: ' + src.charCodeAt(0));                           // 439  // 466
    }                                                                                   // 440  // 467
  }                                                                                     // 441  // 468
                                                                                        // 442  // 469
  return this.tokens;                                                                   // 443  // 470
};                                                                                      // 444  // 471
                                                                                        // 445  // 472
/**                                                                                     // 446  // 473
 * Inline-Level Grammar                                                                 // 447  // 474
 */                                                                                     // 448  // 475
                                                                                        // 449  // 476
var inline = {                                                                          // 450  // 477
  escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,                                                // 451  // 478
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,                                                 // 452  // 479
  url: noop,                                                                            // 453  // 480
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,                        // 454  // 481
  link: /^!?\[(inside)\]\(href\)/,                                                      // 455  // 482
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,                                            // 456  // 483
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,                                           // 457  // 484
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,                             // 458  // 485
  em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,                          // 459  // 486
  code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,                                             // 460  // 487
  br: /^ {2,}\n(?!\s*$)/,                                                               // 461  // 488
  del: noop,                                                                            // 462  // 489
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/                                            // 463  // 490
};                                                                                      // 464  // 491
                                                                                        // 465  // 492
inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;                              // 466  // 493
inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;                        // 467  // 494
                                                                                        // 468  // 495
inline.link = replace(inline.link)                                                      // 469  // 496
  ('inside', inline._inside)                                                            // 470  // 497
  ('href', inline._href)                                                                // 471  // 498
  ();                                                                                   // 472  // 499
                                                                                        // 473  // 500
inline.reflink = replace(inline.reflink)                                                // 474  // 501
  ('inside', inline._inside)                                                            // 475  // 502
  ();                                                                                   // 476  // 503
                                                                                        // 477  // 504
/**                                                                                     // 478  // 505
 * Normal Inline Grammar                                                                // 479  // 506
 */                                                                                     // 480  // 507
                                                                                        // 481  // 508
inline.normal = merge({}, inline);                                                      // 482  // 509
                                                                                        // 483  // 510
/**                                                                                     // 484  // 511
 * Pedantic Inline Grammar                                                              // 485  // 512
 */                                                                                     // 486  // 513
                                                                                        // 487  // 514
inline.pedantic = merge({}, inline.normal, {                                            // 488  // 515
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,             // 489  // 516
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/                        // 490  // 517
});                                                                                     // 491  // 518
                                                                                        // 492  // 519
/**                                                                                     // 493  // 520
 * GFM Inline Grammar                                                                   // 494  // 521
 */                                                                                     // 495  // 522
                                                                                        // 496  // 523
inline.gfm = merge({}, inline.normal, {                                                 // 497  // 524
  escape: replace(inline.escape)('])', '~|])')(),                                       // 498  // 525
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,                                          // 499  // 526
  del: /^~~(?=\S)([\s\S]*?\S)~~/,                                                       // 500  // 527
  text: replace(inline.text)                                                            // 501  // 528
    (']|', '~]|')                                                                       // 502  // 529
    ('|', '|https?://|')                                                                // 503  // 530
    ()                                                                                  // 504  // 531
});                                                                                     // 505  // 532
                                                                                        // 506  // 533
/**                                                                                     // 507  // 534
 * GFM + Line Breaks Inline Grammar                                                     // 508  // 535
 */                                                                                     // 509  // 536
                                                                                        // 510  // 537
inline.breaks = merge({}, inline.gfm, {                                                 // 511  // 538
  br: replace(inline.br)('{2,}', '*')(),                                                // 512  // 539
  text: replace(inline.gfm.text)('{2,}', '*')()                                         // 513  // 540
});                                                                                     // 514  // 541
                                                                                        // 515  // 542
/**                                                                                     // 516  // 543
 * Inline Lexer & Compiler                                                              // 517  // 544
 */                                                                                     // 518  // 545
                                                                                        // 519  // 546
function InlineLexer(links, options) {                                                  // 520  // 547
  this.options = options || marked.defaults;                                            // 521  // 548
  this.links = links;                                                                   // 522  // 549
  this.rules = inline.normal;                                                           // 523  // 550
  this.renderer = this.options.renderer || new Renderer;                                // 524  // 551
  this.renderer.options = this.options;                                                 // 525  // 552
                                                                                        // 526  // 553
  if (!this.links) {                                                                    // 527  // 554
    throw new                                                                           // 528  // 555
      Error('Tokens array requires a `links` property.');                               // 529  // 556
  }                                                                                     // 530  // 557
                                                                                        // 531  // 558
  if (this.options.gfm) {                                                               // 532  // 559
    if (this.options.breaks) {                                                          // 533  // 560
      this.rules = inline.breaks;                                                       // 534  // 561
    } else {                                                                            // 535  // 562
      this.rules = inline.gfm;                                                          // 536  // 563
    }                                                                                   // 537  // 564
  } else if (this.options.pedantic) {                                                   // 538  // 565
    this.rules = inline.pedantic;                                                       // 539  // 566
  }                                                                                     // 540  // 567
}                                                                                       // 541  // 568
                                                                                        // 542  // 569
/**                                                                                     // 543  // 570
 * Expose Inline Rules                                                                  // 544  // 571
 */                                                                                     // 545  // 572
                                                                                        // 546  // 573
InlineLexer.rules = inline;                                                             // 547  // 574
                                                                                        // 548  // 575
/**                                                                                     // 549  // 576
 * Static Lexing/Compiling Method                                                       // 550  // 577
 */                                                                                     // 551  // 578
                                                                                        // 552  // 579
InlineLexer.output = function(src, links, options) {                                    // 553  // 580
  var inline = new InlineLexer(links, options);                                         // 554  // 581
  return inline.output(src);                                                            // 555  // 582
};                                                                                      // 556  // 583
                                                                                        // 557  // 584
/**                                                                                     // 558  // 585
 * Lexing/Compiling                                                                     // 559  // 586
 */                                                                                     // 560  // 587
                                                                                        // 561  // 588
InlineLexer.prototype.output = function(src) {                                          // 562  // 589
  var out = ''                                                                          // 563  // 590
    , link                                                                              // 564  // 591
    , text                                                                              // 565  // 592
    , href                                                                              // 566  // 593
    , cap;                                                                              // 567  // 594
                                                                                        // 568  // 595
  while (src) {                                                                         // 569  // 596
    // escape                                                                           // 570  // 597
    if (cap = this.rules.escape.exec(src)) {                                            // 571  // 598
      src = src.substring(cap[0].length);                                               // 572  // 599
      out += cap[1];                                                                    // 573  // 600
      continue;                                                                         // 574  // 601
    }                                                                                   // 575  // 602
                                                                                        // 576  // 603
    // autolink                                                                         // 577  // 604
    if (cap = this.rules.autolink.exec(src)) {                                          // 578  // 605
      src = src.substring(cap[0].length);                                               // 579  // 606
      if (cap[2] === '@') {                                                             // 580  // 607
        text = cap[1].charAt(6) === ':'                                                 // 581  // 608
          ? this.mangle(cap[1].substring(7))                                            // 582  // 609
          : this.mangle(cap[1]);                                                        // 583  // 610
        href = this.mangle('mailto:') + text;                                           // 584  // 611
      } else {                                                                          // 585  // 612
        text = escape(cap[1]);                                                          // 586  // 613
        href = text;                                                                    // 587  // 614
      }                                                                                 // 588  // 615
      out += this.renderer.link(href, null, text);                                      // 589  // 616
      continue;                                                                         // 590  // 617
    }                                                                                   // 591  // 618
                                                                                        // 592  // 619
    // url (gfm)                                                                        // 593  // 620
    if (!this.inLink && (cap = this.rules.url.exec(src))) {                             // 594  // 621
      src = src.substring(cap[0].length);                                               // 595  // 622
      text = escape(cap[1]);                                                            // 596  // 623
      href = text;                                                                      // 597  // 624
      out += this.renderer.link(href, null, text);                                      // 598  // 625
      continue;                                                                         // 599  // 626
    }                                                                                   // 600  // 627
                                                                                        // 601  // 628
    // tag                                                                              // 602  // 629
    if (cap = this.rules.tag.exec(src)) {                                               // 603  // 630
      if (!this.inLink && /^<a /i.test(cap[0])) {                                       // 604  // 631
        this.inLink = true;                                                             // 605  // 632
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {                               // 606  // 633
        this.inLink = false;                                                            // 607  // 634
      }                                                                                 // 608  // 635
      src = src.substring(cap[0].length);                                               // 609  // 636
      out += this.options.sanitize                                                      // 610  // 637
        ? this.options.sanitizer                                                        // 611  // 638
          ? this.options.sanitizer(cap[0])                                              // 612  // 639
          : escape(cap[0])                                                              // 613  // 640
        : cap[0]                                                                        // 614  // 641
      continue;                                                                         // 615  // 642
    }                                                                                   // 616  // 643
                                                                                        // 617  // 644
    // link                                                                             // 618  // 645
    if (cap = this.rules.link.exec(src)) {                                              // 619  // 646
      src = src.substring(cap[0].length);                                               // 620  // 647
      this.inLink = true;                                                               // 621  // 648
      out += this.outputLink(cap, {                                                     // 622  // 649
        href: cap[2],                                                                   // 623  // 650
        title: cap[3]                                                                   // 624  // 651
      });                                                                               // 625  // 652
      this.inLink = false;                                                              // 626  // 653
      continue;                                                                         // 627  // 654
    }                                                                                   // 628  // 655
                                                                                        // 629  // 656
    // reflink, nolink                                                                  // 630  // 657
    if ((cap = this.rules.reflink.exec(src))                                            // 631  // 658
        || (cap = this.rules.nolink.exec(src))) {                                       // 632  // 659
      src = src.substring(cap[0].length);                                               // 633  // 660
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');                                   // 634  // 661
      link = this.links[link.toLowerCase()];                                            // 635  // 662
      if (!link || !link.href) {                                                        // 636  // 663
        out += cap[0].charAt(0);                                                        // 637  // 664
        src = cap[0].substring(1) + src;                                                // 638  // 665
        continue;                                                                       // 639  // 666
      }                                                                                 // 640  // 667
      this.inLink = true;                                                               // 641  // 668
      out += this.outputLink(cap, link);                                                // 642  // 669
      this.inLink = false;                                                              // 643  // 670
      continue;                                                                         // 644  // 671
    }                                                                                   // 645  // 672
                                                                                        // 646  // 673
    // strong                                                                           // 647  // 674
    if (cap = this.rules.strong.exec(src)) {                                            // 648  // 675
      src = src.substring(cap[0].length);                                               // 649  // 676
      out += this.renderer.strong(this.output(cap[2] || cap[1]));                       // 650  // 677
      continue;                                                                         // 651  // 678
    }                                                                                   // 652  // 679
                                                                                        // 653  // 680
    // em                                                                               // 654  // 681
    if (cap = this.rules.em.exec(src)) {                                                // 655  // 682
      src = src.substring(cap[0].length);                                               // 656  // 683
      out += this.renderer.em(this.output(cap[2] || cap[1]));                           // 657  // 684
      continue;                                                                         // 658  // 685
    }                                                                                   // 659  // 686
                                                                                        // 660  // 687
    // code                                                                             // 661  // 688
    if (cap = this.rules.code.exec(src)) {                                              // 662  // 689
      src = src.substring(cap[0].length);                                               // 663  // 690
      out += this.renderer.codespan(escape(cap[2], true));                              // 664  // 691
      continue;                                                                         // 665  // 692
    }                                                                                   // 666  // 693
                                                                                        // 667  // 694
    // br                                                                               // 668  // 695
    if (cap = this.rules.br.exec(src)) {                                                // 669  // 696
      src = src.substring(cap[0].length);                                               // 670  // 697
      out += this.renderer.br();                                                        // 671  // 698
      continue;                                                                         // 672  // 699
    }                                                                                   // 673  // 700
                                                                                        // 674  // 701
    // del (gfm)                                                                        // 675  // 702
    if (cap = this.rules.del.exec(src)) {                                               // 676  // 703
      src = src.substring(cap[0].length);                                               // 677  // 704
      out += this.renderer.del(this.output(cap[1]));                                    // 678  // 705
      continue;                                                                         // 679  // 706
    }                                                                                   // 680  // 707
                                                                                        // 681  // 708
    // text                                                                             // 682  // 709
    if (cap = this.rules.text.exec(src)) {                                              // 683  // 710
      src = src.substring(cap[0].length);                                               // 684  // 711
      out += this.renderer.text(escape(this.smartypants(cap[0])));                      // 685  // 712
      continue;                                                                         // 686  // 713
    }                                                                                   // 687  // 714
                                                                                        // 688  // 715
    if (src) {                                                                          // 689  // 716
      throw new                                                                         // 690  // 717
        Error('Infinite loop on byte: ' + src.charCodeAt(0));                           // 691  // 718
    }                                                                                   // 692  // 719
  }                                                                                     // 693  // 720
                                                                                        // 694  // 721
  return out;                                                                           // 695  // 722
};                                                                                      // 696  // 723
                                                                                        // 697  // 724
/**                                                                                     // 698  // 725
 * Compile Link                                                                         // 699  // 726
 */                                                                                     // 700  // 727
                                                                                        // 701  // 728
InlineLexer.prototype.outputLink = function(cap, link) {                                // 702  // 729
  var href = escape(link.href)                                                          // 703  // 730
    , title = link.title ? escape(link.title) : null;                                   // 704  // 731
                                                                                        // 705  // 732
  return cap[0].charAt(0) !== '!'                                                       // 706  // 733
    ? this.renderer.link(href, title, this.output(cap[1]))                              // 707  // 734
    : this.renderer.image(href, title, escape(cap[1]));                                 // 708  // 735
};                                                                                      // 709  // 736
                                                                                        // 710  // 737
/**                                                                                     // 711  // 738
 * Smartypants Transformations                                                          // 712  // 739
 */                                                                                     // 713  // 740
                                                                                        // 714  // 741
InlineLexer.prototype.smartypants = function(text) {                                    // 715  // 742
  if (!this.options.smartypants) return text;                                           // 716  // 743
  return text                                                                           // 717  // 744
    // em-dashes                                                                        // 718  // 745
    .replace(/---/g, '\u2014')                                                          // 719  // 746
    // en-dashes                                                                        // 720  // 747
    .replace(/--/g, '\u2013')                                                           // 721  // 748
    // opening singles                                                                  // 722  // 749
    .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')                                     // 723  // 750
    // closing singles & apostrophes                                                    // 724  // 751
    .replace(/'/g, '\u2019')                                                            // 725  // 752
    // opening doubles                                                                  // 726  // 753
    .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')                                // 727  // 754
    // closing doubles                                                                  // 728  // 755
    .replace(/"/g, '\u201d')                                                            // 729  // 756
    // ellipses                                                                         // 730  // 757
    .replace(/\.{3}/g, '\u2026');                                                       // 731  // 758
};                                                                                      // 732  // 759
                                                                                        // 733  // 760
/**                                                                                     // 734  // 761
 * Mangle Links                                                                         // 735  // 762
 */                                                                                     // 736  // 763
                                                                                        // 737  // 764
InlineLexer.prototype.mangle = function(text) {                                         // 738  // 765
  if (!this.options.mangle) return text;                                                // 739  // 766
  var out = ''                                                                          // 740  // 767
    , l = text.length                                                                   // 741  // 768
    , i = 0                                                                             // 742  // 769
    , ch;                                                                               // 743  // 770
                                                                                        // 744  // 771
  for (; i < l; i++) {                                                                  // 745  // 772
    ch = text.charCodeAt(i);                                                            // 746  // 773
    if (Math.random() > 0.5) {                                                          // 747  // 774
      ch = 'x' + ch.toString(16);                                                       // 748  // 775
    }                                                                                   // 749  // 776
    out += '&#' + ch + ';';                                                             // 750  // 777
  }                                                                                     // 751  // 778
                                                                                        // 752  // 779
  return out;                                                                           // 753  // 780
};                                                                                      // 754  // 781
                                                                                        // 755  // 782
/**                                                                                     // 756  // 783
 * Renderer                                                                             // 757  // 784
 */                                                                                     // 758  // 785
                                                                                        // 759  // 786
function Renderer(options) {                                                            // 760  // 787
  this.options = options || {};                                                         // 761  // 788
}                                                                                       // 762  // 789
                                                                                        // 763  // 790
Renderer.prototype.code = function(code, lang, escaped) {                               // 764  // 791
  if (this.options.highlight) {                                                         // 765  // 792
    var out = this.options.highlight(code, lang);                                       // 766  // 793
    if (out != null && out !== code) {                                                  // 767  // 794
      escaped = true;                                                                   // 768  // 795
      code = out;                                                                       // 769  // 796
    }                                                                                   // 770  // 797
  }                                                                                     // 771  // 798
                                                                                        // 772  // 799
  if (!lang) {                                                                          // 773  // 800
    return '<pre><code>'                                                                // 774  // 801
      + (escaped ? code : escape(code, true))                                           // 775  // 802
      + '\n</code></pre>';                                                              // 776  // 803
  }                                                                                     // 777  // 804
                                                                                        // 778  // 805
  return '<pre><code class="'                                                           // 779  // 806
    + this.options.langPrefix                                                           // 780  // 807
    + escape(lang, true)                                                                // 781  // 808
    + '">'                                                                              // 782  // 809
    + (escaped ? code : escape(code, true))                                             // 783  // 810
    + '\n</code></pre>\n';                                                              // 784  // 811
};                                                                                      // 785  // 812
                                                                                        // 786  // 813
Renderer.prototype.blockquote = function(quote) {                                       // 787  // 814
  return '<blockquote>\n' + quote + '</blockquote>\n';                                  // 788  // 815
};                                                                                      // 789  // 816
                                                                                        // 790  // 817
Renderer.prototype.html = function(html) {                                              // 791  // 818
  return html;                                                                          // 792  // 819
};                                                                                      // 793  // 820
                                                                                        // 794  // 821
Renderer.prototype.heading = function(text, level, raw) {                               // 795  // 822
  return '<h'                                                                           // 796  // 823
    + level                                                                             // 797  // 824
    + ' id="'                                                                           // 798  // 825
    + this.options.headerPrefix                                                         // 799  // 826
    + raw.toLowerCase().replace(/[^\w]+/g, '-')                                         // 800  // 827
    + '">'                                                                              // 801  // 828
    + text                                                                              // 802  // 829
    + '</h'                                                                             // 803  // 830
    + level                                                                             // 804  // 831
    + '>\n';                                                                            // 805  // 832
};                                                                                      // 806  // 833
                                                                                        // 807  // 834
Renderer.prototype.hr = function() {                                                    // 808  // 835
  return this.options.xhtml ? '<hr/>\n' : '<hr>\n';                                     // 809  // 836
};                                                                                      // 810  // 837
                                                                                        // 811  // 838
Renderer.prototype.list = function(body, ordered) {                                     // 812  // 839
  var type = ordered ? 'ol' : 'ul';                                                     // 813  // 840
  return '<' + type + '>\n' + body + '</' + type + '>\n';                               // 814  // 841
};                                                                                      // 815  // 842
                                                                                        // 816  // 843
Renderer.prototype.listitem = function(text) {                                          // 817  // 844
  return '<li>' + text + '</li>\n';                                                     // 818  // 845
};                                                                                      // 819  // 846
                                                                                        // 820  // 847
Renderer.prototype.paragraph = function(text) {                                         // 821  // 848
  return '<p>' + text + '</p>\n';                                                       // 822  // 849
};                                                                                      // 823  // 850
                                                                                        // 824  // 851
Renderer.prototype.table = function(header, body) {                                     // 825  // 852
  return '<table>\n'                                                                    // 826  // 853
    + '<thead>\n'                                                                       // 827  // 854
    + header                                                                            // 828  // 855
    + '</thead>\n'                                                                      // 829  // 856
    + '<tbody>\n'                                                                       // 830  // 857
    + body                                                                              // 831  // 858
    + '</tbody>\n'                                                                      // 832  // 859
    + '</table>\n';                                                                     // 833  // 860
};                                                                                      // 834  // 861
                                                                                        // 835  // 862
Renderer.prototype.tablerow = function(content) {                                       // 836  // 863
  return '<tr>\n' + content + '</tr>\n';                                                // 837  // 864
};                                                                                      // 838  // 865
                                                                                        // 839  // 866
Renderer.prototype.tablecell = function(content, flags) {                               // 840  // 867
  var type = flags.header ? 'th' : 'td';                                                // 841  // 868
  var tag = flags.align                                                                 // 842  // 869
    ? '<' + type + ' style="text-align:' + flags.align + '">'                           // 843  // 870
    : '<' + type + '>';                                                                 // 844  // 871
  return tag + content + '</' + type + '>\n';                                           // 845  // 872
};                                                                                      // 846  // 873
                                                                                        // 847  // 874
// span level renderer                                                                  // 848  // 875
Renderer.prototype.strong = function(text) {                                            // 849  // 876
  return '<strong>' + text + '</strong>';                                               // 850  // 877
};                                                                                      // 851  // 878
                                                                                        // 852  // 879
Renderer.prototype.em = function(text) {                                                // 853  // 880
  return '<em>' + text + '</em>';                                                       // 854  // 881
};                                                                                      // 855  // 882
                                                                                        // 856  // 883
Renderer.prototype.codespan = function(text) {                                          // 857  // 884
  return '<code>' + text + '</code>';                                                   // 858  // 885
};                                                                                      // 859  // 886
                                                                                        // 860  // 887
Renderer.prototype.br = function() {                                                    // 861  // 888
  return this.options.xhtml ? '<br/>' : '<br>';                                         // 862  // 889
};                                                                                      // 863  // 890
                                                                                        // 864  // 891
Renderer.prototype.del = function(text) {                                               // 865  // 892
  return '<del>' + text + '</del>';                                                     // 866  // 893
};                                                                                      // 867  // 894
                                                                                        // 868  // 895
Renderer.prototype.link = function(href, title, text) {                                 // 869  // 896
  if (this.options.sanitize) {                                                          // 870  // 897
    try {                                                                               // 871  // 898
      var prot = decodeURIComponent(unescape(href))                                     // 872  // 899
        .replace(/[^\w:]/g, '')                                                         // 873  // 900
        .toLowerCase();                                                                 // 874  // 901
    } catch (e) {                                                                       // 875  // 902
      return '';                                                                        // 876  // 903
    }                                                                                   // 877  // 904
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {         // 878  // 905
      return '';                                                                        // 879  // 906
    }                                                                                   // 880  // 907
  }                                                                                     // 881  // 908
  var out = '<a href="' + href + '"';                                                   // 882  // 909
  if (title) {                                                                          // 883  // 910
    out += ' title="' + title + '"';                                                    // 884  // 911
  }                                                                                     // 885  // 912
  out += '>' + text + '</a>';                                                           // 886  // 913
  return out;                                                                           // 887  // 914
};                                                                                      // 888  // 915
                                                                                        // 889  // 916
Renderer.prototype.image = function(href, title, text) {                                // 890  // 917
  var out = '<img src="' + href + '" alt="' + text + '"';                               // 891  // 918
  if (title) {                                                                          // 892  // 919
    out += ' title="' + title + '"';                                                    // 893  // 920
  }                                                                                     // 894  // 921
  out += this.options.xhtml ? '/>' : '>';                                               // 895  // 922
  return out;                                                                           // 896  // 923
};                                                                                      // 897  // 924
                                                                                        // 898  // 925
Renderer.prototype.text = function(text) {                                              // 899  // 926
  return text;                                                                          // 900  // 927
};                                                                                      // 901  // 928
                                                                                        // 902  // 929
/**                                                                                     // 903  // 930
 * Parsing & Compiling                                                                  // 904  // 931
 */                                                                                     // 905  // 932
                                                                                        // 906  // 933
function Parser(options) {                                                              // 907  // 934
  this.tokens = [];                                                                     // 908  // 935
  this.token = null;                                                                    // 909  // 936
  this.options = options || marked.defaults;                                            // 910  // 937
  this.options.renderer = this.options.renderer || new Renderer;                        // 911  // 938
  this.renderer = this.options.renderer;                                                // 912  // 939
  this.renderer.options = this.options;                                                 // 913  // 940
}                                                                                       // 914  // 941
                                                                                        // 915  // 942
/**                                                                                     // 916  // 943
 * Static Parse Method                                                                  // 917  // 944
 */                                                                                     // 918  // 945
                                                                                        // 919  // 946
Parser.parse = function(src, options, renderer) {                                       // 920  // 947
  var parser = new Parser(options, renderer);                                           // 921  // 948
  return parser.parse(src);                                                             // 922  // 949
};                                                                                      // 923  // 950
                                                                                        // 924  // 951
/**                                                                                     // 925  // 952
 * Parse Loop                                                                           // 926  // 953
 */                                                                                     // 927  // 954
                                                                                        // 928  // 955
Parser.prototype.parse = function(src) {                                                // 929  // 956
  this.inline = new InlineLexer(src.links, this.options, this.renderer);                // 930  // 957
  this.tokens = src.reverse();                                                          // 931  // 958
                                                                                        // 932  // 959
  var out = '';                                                                         // 933  // 960
  while (this.next()) {                                                                 // 934  // 961
    out += this.tok();                                                                  // 935  // 962
  }                                                                                     // 936  // 963
                                                                                        // 937  // 964
  return out;                                                                           // 938  // 965
};                                                                                      // 939  // 966
                                                                                        // 940  // 967
/**                                                                                     // 941  // 968
 * Next Token                                                                           // 942  // 969
 */                                                                                     // 943  // 970
                                                                                        // 944  // 971
Parser.prototype.next = function() {                                                    // 945  // 972
  return this.token = this.tokens.pop();                                                // 946  // 973
};                                                                                      // 947  // 974
                                                                                        // 948  // 975
/**                                                                                     // 949  // 976
 * Preview Next Token                                                                   // 950  // 977
 */                                                                                     // 951  // 978
                                                                                        // 952  // 979
Parser.prototype.peek = function() {                                                    // 953  // 980
  return this.tokens[this.tokens.length - 1] || 0;                                      // 954  // 981
};                                                                                      // 955  // 982
                                                                                        // 956  // 983
/**                                                                                     // 957  // 984
 * Parse Text Tokens                                                                    // 958  // 985
 */                                                                                     // 959  // 986
                                                                                        // 960  // 987
Parser.prototype.parseText = function() {                                               // 961  // 988
  var body = this.token.text;                                                           // 962  // 989
                                                                                        // 963  // 990
  while (this.peek().type === 'text') {                                                 // 964  // 991
    body += '\n' + this.next().text;                                                    // 965  // 992
  }                                                                                     // 966  // 993
                                                                                        // 967  // 994
  return this.inline.output(body);                                                      // 968  // 995
};                                                                                      // 969  // 996
                                                                                        // 970  // 997
/**                                                                                     // 971  // 998
 * Parse Current Token                                                                  // 972  // 999
 */                                                                                     // 973  // 1000
                                                                                        // 974  // 1001
Parser.prototype.tok = function() {                                                     // 975  // 1002
  switch (this.token.type) {                                                            // 976  // 1003
    case 'space': {                                                                     // 977  // 1004
      return '';                                                                        // 978  // 1005
    }                                                                                   // 979  // 1006
    case 'hr': {                                                                        // 980  // 1007
      return this.renderer.hr();                                                        // 981  // 1008
    }                                                                                   // 982  // 1009
    case 'heading': {                                                                   // 983  // 1010
      return this.renderer.heading(                                                     // 984  // 1011
        this.inline.output(this.token.text),                                            // 985  // 1012
        this.token.depth,                                                               // 986  // 1013
        this.token.text);                                                               // 987  // 1014
    }                                                                                   // 988  // 1015
    case 'code': {                                                                      // 989  // 1016
      return this.renderer.code(this.token.text,                                        // 990  // 1017
        this.token.lang,                                                                // 991  // 1018
        this.token.escaped);                                                            // 992  // 1019
    }                                                                                   // 993  // 1020
    case 'table': {                                                                     // 994  // 1021
      var header = ''                                                                   // 995  // 1022
        , body = ''                                                                     // 996  // 1023
        , i                                                                             // 997  // 1024
        , row                                                                           // 998  // 1025
        , cell                                                                          // 999  // 1026
        , flags                                                                         // 1000
        , j;                                                                            // 1001
                                                                                        // 1002
      // header                                                                         // 1003
      cell = '';                                                                        // 1004
      for (i = 0; i < this.token.header.length; i++) {                                  // 1005
        flags = { header: true, align: this.token.align[i] };                           // 1006
        cell += this.renderer.tablecell(                                                // 1007
          this.inline.output(this.token.header[i]),                                     // 1008
          { header: true, align: this.token.align[i] }                                  // 1009
        );                                                                              // 1010
      }                                                                                 // 1011
      header += this.renderer.tablerow(cell);                                           // 1012
                                                                                        // 1013
      for (i = 0; i < this.token.cells.length; i++) {                                   // 1014
        row = this.token.cells[i];                                                      // 1015
                                                                                        // 1016
        cell = '';                                                                      // 1017
        for (j = 0; j < row.length; j++) {                                              // 1018
          cell += this.renderer.tablecell(                                              // 1019
            this.inline.output(row[j]),                                                 // 1020
            { header: false, align: this.token.align[j] }                               // 1021
          );                                                                            // 1022
        }                                                                               // 1023
                                                                                        // 1024
        body += this.renderer.tablerow(cell);                                           // 1025
      }                                                                                 // 1026
      return this.renderer.table(header, body);                                         // 1027
    }                                                                                   // 1028
    case 'blockquote_start': {                                                          // 1029
      var body = '';                                                                    // 1030
                                                                                        // 1031
      while (this.next().type !== 'blockquote_end') {                                   // 1032
        body += this.tok();                                                             // 1033
      }                                                                                 // 1034
                                                                                        // 1035
      return this.renderer.blockquote(body);                                            // 1036
    }                                                                                   // 1037
    case 'list_start': {                                                                // 1038
      var body = ''                                                                     // 1039
        , ordered = this.token.ordered;                                                 // 1040
                                                                                        // 1041
      while (this.next().type !== 'list_end') {                                         // 1042
        body += this.tok();                                                             // 1043
      }                                                                                 // 1044
                                                                                        // 1045
      return this.renderer.list(body, ordered);                                         // 1046
    }                                                                                   // 1047
    case 'list_item_start': {                                                           // 1048
      var body = '';                                                                    // 1049
                                                                                        // 1050
      while (this.next().type !== 'list_item_end') {                                    // 1051
        body += this.token.type === 'text'                                              // 1052
          ? this.parseText()                                                            // 1053
          : this.tok();                                                                 // 1054
      }                                                                                 // 1055
                                                                                        // 1056
      return this.renderer.listitem(body);                                              // 1057
    }                                                                                   // 1058
    case 'loose_item_start': {                                                          // 1059
      var body = '';                                                                    // 1060
                                                                                        // 1061
      while (this.next().type !== 'list_item_end') {                                    // 1062
        body += this.tok();                                                             // 1063
      }                                                                                 // 1064
                                                                                        // 1065
      return this.renderer.listitem(body);                                              // 1066
    }                                                                                   // 1067
    case 'html': {                                                                      // 1068
      var html = !this.token.pre && !this.options.pedantic                              // 1069
        ? this.inline.output(this.token.text)                                           // 1070
        : this.token.text;                                                              // 1071
      return this.renderer.html(html);                                                  // 1072
    }                                                                                   // 1073
    case 'paragraph': {                                                                 // 1074
      return this.renderer.paragraph(this.inline.output(this.token.text));              // 1075
    }                                                                                   // 1076
    case 'text': {                                                                      // 1077
      return this.renderer.paragraph(this.parseText());                                 // 1078
    }                                                                                   // 1079
  }                                                                                     // 1080
};                                                                                      // 1081
                                                                                        // 1082
/**                                                                                     // 1083
 * Helpers                                                                              // 1084
 */                                                                                     // 1085
                                                                                        // 1086
function escape(html, encode) {                                                         // 1087
  return html                                                                           // 1088
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')                                  // 1089
    .replace(/</g, '&lt;')                                                              // 1090
    .replace(/>/g, '&gt;')                                                              // 1091
    .replace(/"/g, '&quot;')                                                            // 1092
    .replace(/'/g, '&#39;');                                                            // 1093
}                                                                                       // 1094
                                                                                        // 1095
function unescape(html) {                                                               // 1096
  return html.replace(/&([#\w]+);/g, function(_, n) {                                   // 1097
    n = n.toLowerCase();                                                                // 1098
    if (n === 'colon') return ':';                                                      // 1099
    if (n.charAt(0) === '#') {                                                          // 1100
      return n.charAt(1) === 'x'                                                        // 1101
        ? String.fromCharCode(parseInt(n.substring(2), 16))                             // 1102
        : String.fromCharCode(+n.substring(1));                                         // 1103
    }                                                                                   // 1104
    return '';                                                                          // 1105
  });                                                                                   // 1106
}                                                                                       // 1107
                                                                                        // 1108
function replace(regex, opt) {                                                          // 1109
  regex = regex.source;                                                                 // 1110
  opt = opt || '';                                                                      // 1111
  return function self(name, val) {                                                     // 1112
    if (!name) return new RegExp(regex, opt);                                           // 1113
    val = val.source || val;                                                            // 1114
    val = val.replace(/(^|[^\[])\^/g, '$1');                                            // 1115
    regex = regex.replace(name, val);                                                   // 1116
    return self;                                                                        // 1117
  };                                                                                    // 1118
}                                                                                       // 1119
                                                                                        // 1120
function noop() {}                                                                      // 1121
noop.exec = noop;                                                                       // 1122
                                                                                        // 1123
function merge(obj) {                                                                   // 1124
  var i = 1                                                                             // 1125
    , target                                                                            // 1126
    , key;                                                                              // 1127
                                                                                        // 1128
  for (; i < arguments.length; i++) {                                                   // 1129
    target = arguments[i];                                                              // 1130
    for (key in target) {                                                               // 1131
      if (Object.prototype.hasOwnProperty.call(target, key)) {                          // 1132
        obj[key] = target[key];                                                         // 1133
      }                                                                                 // 1134
    }                                                                                   // 1135
  }                                                                                     // 1136
                                                                                        // 1137
  return obj;                                                                           // 1138
}                                                                                       // 1139
                                                                                        // 1140
                                                                                        // 1141
/**                                                                                     // 1142
 * Marked                                                                               // 1143
 */                                                                                     // 1144
                                                                                        // 1145
function marked(src, opt, callback) {                                                   // 1146
  if (callback || typeof opt === 'function') {                                          // 1147
    if (!callback) {                                                                    // 1148
      callback = opt;                                                                   // 1149
      opt = null;                                                                       // 1150
    }                                                                                   // 1151
                                                                                        // 1152
    opt = merge({}, marked.defaults, opt || {});                                        // 1153
                                                                                        // 1154
    var highlight = opt.highlight                                                       // 1155
      , tokens                                                                          // 1156
      , pending                                                                         // 1157
      , i = 0;                                                                          // 1158
                                                                                        // 1159
    try {                                                                               // 1160
      tokens = Lexer.lex(src, opt)                                                      // 1161
    } catch (e) {                                                                       // 1162
      return callback(e);                                                               // 1163
    }                                                                                   // 1164
                                                                                        // 1165
    pending = tokens.length;                                                            // 1166
                                                                                        // 1167
    var done = function(err) {                                                          // 1168
      if (err) {                                                                        // 1169
        opt.highlight = highlight;                                                      // 1170
        return callback(err);                                                           // 1171
      }                                                                                 // 1172
                                                                                        // 1173
      var out;                                                                          // 1174
                                                                                        // 1175
      try {                                                                             // 1176
        out = Parser.parse(tokens, opt);                                                // 1177
      } catch (e) {                                                                     // 1178
        err = e;                                                                        // 1179
      }                                                                                 // 1180
                                                                                        // 1181
      opt.highlight = highlight;                                                        // 1182
                                                                                        // 1183
      return err                                                                        // 1184
        ? callback(err)                                                                 // 1185
        : callback(null, out);                                                          // 1186
    };                                                                                  // 1187
                                                                                        // 1188
    if (!highlight || highlight.length < 3) {                                           // 1189
      return done();                                                                    // 1190
    }                                                                                   // 1191
                                                                                        // 1192
    delete opt.highlight;                                                               // 1193
                                                                                        // 1194
    if (!pending) return done();                                                        // 1195
                                                                                        // 1196
    for (; i < tokens.length; i++) {                                                    // 1197
      (function(token) {                                                                // 1198
        if (token.type !== 'code') {                                                    // 1199
          return --pending || done();                                                   // 1200
        }                                                                               // 1201
        return highlight(token.text, token.lang, function(err, code) {                  // 1202
          if (err) return done(err);                                                    // 1203
          if (code == null || code === token.text) {                                    // 1204
            return --pending || done();                                                 // 1205
          }                                                                             // 1206
          token.text = code;                                                            // 1207
          token.escaped = true;                                                         // 1208
          --pending || done();                                                          // 1209
        });                                                                             // 1210
      })(tokens[i]);                                                                    // 1211
    }                                                                                   // 1212
                                                                                        // 1213
    return;                                                                             // 1214
  }                                                                                     // 1215
  try {                                                                                 // 1216
    if (opt) opt = merge({}, marked.defaults, opt);                                     // 1217
    return Parser.parse(Lexer.lex(src, opt), opt);                                      // 1218
  } catch (e) {                                                                         // 1219
    e.message += '\nPlease report this to https://github.com/chjj/marked.';             // 1220
    if ((opt || marked.defaults).silent) {                                              // 1221
      return '<p>An error occured:</p><pre>'                                            // 1222
        + escape(e.message + '', true)                                                  // 1223
        + '</pre>';                                                                     // 1224
    }                                                                                   // 1225
    throw e;                                                                            // 1226
  }                                                                                     // 1227
}                                                                                       // 1228
                                                                                        // 1229
/**                                                                                     // 1230
 * Options                                                                              // 1231
 */                                                                                     // 1232
                                                                                        // 1233
marked.options =                                                                        // 1234
marked.setOptions = function(opt) {                                                     // 1235
  merge(marked.defaults, opt);                                                          // 1236
  return marked;                                                                        // 1237
};                                                                                      // 1238
                                                                                        // 1239
marked.defaults = {                                                                     // 1240
  gfm: true,                                                                            // 1241
  tables: true,                                                                         // 1242
  breaks: false,                                                                        // 1243
  pedantic: false,                                                                      // 1244
  sanitize: false,                                                                      // 1245
  sanitizer: null,                                                                      // 1246
  mangle: true,                                                                         // 1247
  smartLists: false,                                                                    // 1248
  silent: false,                                                                        // 1249
  highlight: null,                                                                      // 1250
  langPrefix: 'lang-',                                                                  // 1251
  smartypants: false,                                                                   // 1252
  headerPrefix: '',                                                                     // 1253
  renderer: new Renderer,                                                               // 1254
  xhtml: false                                                                          // 1255
};                                                                                      // 1256
                                                                                        // 1257
/**                                                                                     // 1258
 * Expose                                                                               // 1259
 */                                                                                     // 1260
                                                                                        // 1261
marked.Parser = Parser;                                                                 // 1262
marked.parser = Parser.parse;                                                           // 1263
                                                                                        // 1264
marked.Renderer = Renderer;                                                             // 1265
                                                                                        // 1266
marked.Lexer = Lexer;                                                                   // 1267
marked.lexer = Lexer.lex;                                                               // 1268
                                                                                        // 1269
marked.InlineLexer = InlineLexer;                                                       // 1270
marked.inlineLexer = InlineLexer.output;                                                // 1271
                                                                                        // 1272
marked.parse = marked;                                                                  // 1273
                                                                                        // 1274
if (typeof module !== 'undefined' && typeof exports === 'object') {                     // 1275
  module.exports = marked;                                                              // 1276
} else if (typeof define === 'function' && define.amd) {                                // 1277
  define(function() { return marked; });                                                // 1278
} else {                                                                                // 1279
  this.marked = marked;                                                                 // 1280
}                                                                                       // 1281
                                                                                        // 1282
}).call(function() {                                                                    // 1283
  return this || (typeof window !== 'undefined' ? window : global);                     // 1284
}());                                                                                   // 1285
                                                                                        // 1286
//////////////////////////////////////////////////////////////////////////////////////////      // 1314
                                                                                                // 1315
}).call(this);                                                                                  // 1316
                                                                                                // 1317
                                                                                                // 1318
                                                                                                // 1319
                                                                                                // 1320
                                                                                                // 1321
                                                                                                // 1322
(function () {                                                                                  // 1323
                                                                                                // 1324
//////////////////////////////////////////////////////////////////////////////////////////      // 1325
//                                                                                      //      // 1326
// packages/chuangbo:marked/post-marked.js                                              //      // 1327
//                                                                                      //      // 1328
//////////////////////////////////////////////////////////////////////////////////////////      // 1329
                                                                                        //      // 1330
marked = module.exports;                                                                // 1    // 1331
//////////////////////////////////////////////////////////////////////////////////////////      // 1332
                                                                                                // 1333
}).call(this);                                                                                  // 1334
                                                                                                // 1335
//////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['chuangbo:marked'] = {
  marked: marked
};

})();

//# sourceMappingURL=chuangbo_marked.js.map
