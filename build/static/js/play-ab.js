"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayAb = exports.Utils = void 0;
var electron_1 = require("electron");
var _loopLimit;
var _bet;
var _lowerBet;
var _hasActiveWorker;
var _account;
var _userSession;
var _accounts;
var _canLogin;
var Utils = /** @class */ (function () {
    function Utils($window, main) {
        var _this = this;
        this.gameListWithPrediction = [];
        this.nbaTeams = [
            'atlanta hawks',
            'boston celtics',
            'brooklyn nets',
            'charlotte hornets',
            'chicago bulls',
            'cleveland cavaliers',
            'dallas mavericks',
            'denver nuggets',
            'detroit pistons',
            'golden state warriors',
            'houston rockets',
            'indiana pacers',
            'los angeles clippers',
            'los angeles lakers',
            'memphis grizzlies',
            'miami heat',
            'milwaukee bucks',
            'minnesota timberwolves',
            'new orleans pelicans',
            'new york knicks',
            'oklahoma city thunder',
            'orlando magic',
            'philadelphia 76ers',
            'phoenix suns',
            'portland trail blazers',
            'sacramento kings',
            'san antonio spurs',
            'toronto raptors',
            'utah jazz',
            'washington wizards',
        ];
        this.highBetRate = 11;
        this.sameBetRate = 11; // <---- will trigger same bet if it's less than or equal
        /*
         * things needs to be changed on the
         * webviewComponent
         * */
        this.account = '';
        this.accounts = {};
        this.canLogin = false;
        this.bet = 25;
        this.lowerBet = 3;
        this.loopLimit = 200;
        this.stakeLimit = 380;
        this.autoCashoutConfig = undefined;
        /*
         * sameBetRate is less than or equal to
         * */
        this.gameConfig = {
            Tennis: {
                highBetRate: 20,
                sameBetRate: 20,
            },
            Hockey: {
                highBetRate: 15,
                sameBetRate: 14,
            },
            'Ice Hockey': {
                highBetRate: 15,
                sameBetRate: 14,
            },
            Rugby: {
                highBetRate: 1000,
                sameBetRate: 0,
            },
            Soccer: {
                highBetRate: 1000,
                sameBetRate: 0,
            },
        };
        this.$Game = {
            isMoneyLine: function (div) {
                var _a, _b, _c;
                var parent = (_b = (_a = div === null || div === void 0 ? void 0 : div.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
                return (!(parent === null || parent === void 0 ? void 0 : parent.innerText.includes('3-WAY')) &&
                    ((_c = div === null || div === void 0 ? void 0 : div.querySelectorAll('.bto-sb-event-odds-right .bto-sb-event-odds-cell')) === null || _c === void 0 ? void 0 : _c.length) === 2);
            },
            getActiveGame: function (div) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
                var parent = (_b = (_a = div === null || div === void 0 ? void 0 : div.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement;
                var game = (_c = parent === null || parent === void 0 ? void 0 : parent.querySelector('.bto-sb-widget-title h3')) === null || _c === void 0 ? void 0 : _c.innerHTML;
                var team1 = div.querySelector('.bto-sb-event-odds-left .bto-sb-event-team:nth-child(1)');
                var team2 = div.querySelector('.bto-sb-event-odds-left .bto-sb-event-team:nth-child(3)');
                var justBet = div.classList.contains('justBet');
                var badBet = div.classList.contains('badBet');
                var team1Name = ((_d = team1 === null || team1 === void 0 ? void 0 : team1.querySelector('span:nth-child(1)')) === null || _d === void 0 ? void 0 : _d.innerHTML.trim()) || '';
                var team1Score = parseInt(((_e = team1 === null || team1 === void 0 ? void 0 : team1.querySelector('span:nth-child(2) i')) === null || _e === void 0 ? void 0 : _e.innerHTML) || '0', 10);
                var team2Name = ((_f = team2 === null || team2 === void 0 ? void 0 : team2.querySelector('span:nth-child(1)')) === null || _f === void 0 ? void 0 : _f.innerHTML.trim()) || '';
                var team2Score = parseInt(((_g = team2 === null || team2 === void 0 ? void 0 : team2.querySelector('span:nth-child(2) i')) === null || _g === void 0 ? void 0 : _g.innerHTML) || '0', 10);
                var time = (_h = div === null || div === void 0 ? void 0 : div.querySelector('.bto-sb-event-time i')) === null || _h === void 0 ? void 0 : _h.innerText;
                (_j = div === null || div === void 0 ? void 0 : div.querySelector('.bto-sb-event-time i')) === null || _j === void 0 ? void 0 : _j.remove();
                var quarter = (_k = div === null || div === void 0 ? void 0 : div.querySelector('.bto-sb-event-time')) === null || _k === void 0 ? void 0 : _k.innerText;
                var bet1RateEl = div === null || div === void 0 ? void 0 : div.querySelector('.bto-sb-event-odds-right .bto-sb-event-odds-cell:nth-child(1) span:nth-child(1)');
                var bet2RateEl = div === null || div === void 0 ? void 0 : div.querySelector('.bto-sb-event-odds-right .bto-sb-event-odds-cell:nth-child(2) span:nth-child(1)');
                var bet1Rate = bet1RateEl === null || bet1RateEl === void 0 ? void 0 : bet1RateEl.innerText;
                var bet2Rate = bet2RateEl === null || bet2RateEl === void 0 ? void 0 : bet2RateEl.innerText;
                var isBet1NaN = bet1Rate && isNaN(parseFloat(bet1Rate));
                var isBet2NaN = bet2Rate && isNaN(parseFloat(bet2Rate));
                var isBet1Suspended = (bet1RateEl === null || bet1RateEl === void 0 ? void 0 : bet1RateEl.classList.contains('bto-sb-odd-lock')) || bet1Rate === '--' || isBet1NaN;
                var isBet2Suspended = (bet2RateEl === null || bet2RateEl === void 0 ? void 0 : bet2RateEl.classList.contains('bto-sb-odd-lock')) || bet2Rate === '--' || isBet2NaN;
                var suspended = [isBet1Suspended, isBet2Suspended].filter(Boolean);
                var suspendedCount = suspended.length;
                var isSuspended = (suspended === null || suspended === void 0 ? void 0 : suspended.length) === 2;
                var spread = Math.abs(team1Score - team2Score);
                var quarterSearch = ((_l = parent === null || parent === void 0 ? void 0 : parent.innerText) === null || _l === void 0 ? void 0 : _l.toLowerCase()) || '';
                var is1stQuarter = quarterSearch.includes('1st');
                var is2ndQuarter = quarterSearch.includes('2nd');
                var is3rdQuarter = quarterSearch.includes('3rd');
                var is4thQuarter = quarterSearch.includes('4th');
                var is9thInning = quarterSearch.includes('9th');
                var isOvertime = quarterSearch.includes('overtime');
                var isFirstHalf = quarterSearch.includes('first');
                var isSecondHalf = quarterSearch.includes('second');
                var isNBA = _this.nbaTeams.includes(team1Name.toLowerCase()) || _this.nbaTeams.includes(team2Name.toLowerCase());
                return {
                    spread: spread,
                    game: game,
                    quarter: quarter,
                    bet1Rate: bet1Rate,
                    bet2Rate: bet2Rate,
                    team1Score: team1Score,
                    team2Score: team2Score,
                    team1Name: team1Name,
                    team2Name: team2Name,
                    isSuspended: isSuspended,
                    is1stQuarter: is1stQuarter,
                    is2ndQuarter: is2ndQuarter,
                    is3rdQuarter: is3rdQuarter,
                    is4thQuarter: is4thQuarter,
                    isOvertime: isOvertime,
                    is9thInning: is9thInning,
                    justBet: justBet,
                    badBet: badBet,
                    suspendedCount: suspendedCount,
                    isBet1Suspended: isBet1Suspended,
                    isBet2Suspended: isBet2Suspended,
                    isFirstHalf: isFirstHalf,
                    isSecondHalf: isSecondHalf,
                    isNBA: isNBA,
                    time: time,
                };
            },
            getBetMode: function (activeGame, gameListWithPrediction, openBets) {
                var _a, _b;
                var spread = activeGame.spread, bet1Rate = activeGame.bet1Rate, bet2Rate = activeGame.bet2Rate, game = activeGame.game, team1Name = activeGame.team1Name, team2Name = activeGame.team2Name, suspendedCount = activeGame.suspendedCount, isFirstHalf = activeGame.isFirstHalf, isSecondHalf = activeGame.isSecondHalf, is2ndQuarter = activeGame.is2ndQuarter, is3rdQuarter = activeGame.is3rdQuarter, is4thQuarter = activeGame.is4thQuarter, isOvertime = activeGame.isOvertime, isNBA = activeGame.isNBA;
                var found = gameListWithPrediction.find(function (x) { var _a; return ((_a = x.team1Name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === (team1Name === null || team1Name === void 0 ? void 0 : team1Name.toLowerCase()); });
                var team1PredictionVotes = (found && parseInt(found.team1PredictionVotes, 10)) || 0;
                var team2PredictionVotes = (found && parseInt(found.team2PredictionVotes, 10)) || 0;
                var sofaTeamVotes50 = found && (team1PredictionVotes >= 50 || team2PredictionVotes >= 50);
                var sofaTeamVotes100 = found && (team1PredictionVotes >= 100 || team2PredictionVotes >= 100);
                var sofaTeamVotes300 = found && (team1PredictionVotes >= 300 || team2PredictionVotes >= 300);
                var sofaTeamVotes500 = found && (team1PredictionVotes >= 500 || team2PredictionVotes >= 500);
                var sofaTeamVotes1k = found && (team1PredictionVotes >= 1000 || team2PredictionVotes >= 1000);
                var sofaTeamVotes3k = found && (team1PredictionVotes >= 3000 || team2PredictionVotes >= 3000);
                var sofaTeamVotes5k = found && (team1PredictionVotes >= 5000 || team2PredictionVotes >= 5000);
                var sofaVotesDiff = (found && Math.abs(team1PredictionVotes - team2PredictionVotes)) || 0;
                var sofaVotes = sofaTeamVotes50 ||
                    sofaTeamVotes100 ||
                    sofaTeamVotes300 ||
                    sofaTeamVotes500 ||
                    sofaTeamVotes1k ||
                    sofaTeamVotes3k ||
                    sofaTeamVotes5k;
                var isSpread20SofaNba = spread >= 20 && isNBA && sofaVotes && (is3rdQuarter || is4thQuarter || isOvertime);
                var isSpread14InHalfGame = spread >= 14 && sofaVotes && (isFirstHalf || isSecondHalf);
                var isSpread15NotNBA = spread >= 15 && sofaVotes && !isNBA && (is2ndQuarter || is3rdQuarter || is4thQuarter);
                var isHockeySpread4Sofa = game === 'Hockey' && spread >= 4 && sofaVotes;
                var isHockeySpread3Sofa = sofaVotesDiff >= 100 && game === 'Hockey' && spread >= 3;
                /*
                 * ignore sofa
                 * */
                var isSpread20NoSofaNoNBA = spread >= 20 && !isNBA;
                var isSpread15NoSofaNoNBA = spread >= 15 && !isNBA && is4thQuarter;
                var filteredOpenBet = openBets === null || openBets === void 0 ? void 0 : openBets.filter(function (item) {
                    var _a, _b;
                    var eventDescription = ((_b = (_a = item.details) === null || _a === void 0 ? void 0 : _a.i) === null || _b === void 0 ? void 0 : _b[0].mt) || '';
                    return (eventDescription.toLowerCase().includes(team1Name === null || team1Name === void 0 ? void 0 : team1Name.toLowerCase()) ||
                        eventDescription.toLowerCase().includes(team2Name === null || team2Name === void 0 ? void 0 : team2Name.toLowerCase()));
                });
                /*
                 * made easy
                 * */
                var isBetMadeEasy = false;
                var betMadeEasyCheck = bet1Rate >= _this.highBetRate || bet2Rate >= _this.highBetRate;
                if (_this.gameConfig[game.trim()]) {
                    betMadeEasyCheck =
                        bet1Rate >= _this.gameConfig[game].highBetRate || bet2Rate >= _this.gameConfig[game].highBetRate;
                }
                if (betMadeEasyCheck) {
                    isBetMadeEasy = true;
                }
                if (game === 'Soccer') {
                    _this.log({
                        LOG: {
                            team1Name: team1Name,
                            game: game,
                            gagaga: _this.gameConfig[game.trim()],
                            isBetMadeEasy: isBetMadeEasy,
                            bet1Rate: bet1Rate,
                            bet2Rate: bet2Rate,
                            bet1RateS: bet1Rate >= ((_a = _this.gameConfig[game]) === null || _a === void 0 ? void 0 : _a.highBetRate),
                            bet2RateS: bet2Rate >= ((_b = _this.gameConfig[game]) === null || _b === void 0 ? void 0 : _b.highBetRate),
                        },
                    });
                }
                var foundGame = filteredOpenBet && filteredOpenBet.length === 0 && suspendedCount === 0 && isBetMadeEasy;
                return {
                    foundGame: foundGame,
                    goTeam1: false, // disabled sofa
                    goTeam2: false, // disabled sofa
                    isNBA: isNBA,
                    isLowerBet: false, // disabled lowerBet
                    team1PredictionVotes: team1PredictionVotes,
                    team2PredictionVotes: team2PredictionVotes,
                    isSpread15NotNBA: isSpread15NotNBA,
                    isHockeySpread4Sofa: isHockeySpread4Sofa,
                    isHockeySpread3Sofa: isHockeySpread3Sofa,
                    isSpread14InHalfGame: isSpread14InHalfGame,
                    isSpread20NoSofaNoNBA: isSpread20NoSofaNoNBA,
                    isSpread15NoSofaNoNBA: isSpread15NoSofaNoNBA,
                    isSpread20SofaNba: isSpread20SofaNba,
                };
            },
            checkSameGameBet: function (activeGame, gameListWithPrediction, openBets) {
                var team1Name = activeGame.team1Name, team2Name = activeGame.team2Name, bet1Rate = activeGame.bet1Rate, bet2Rate = activeGame.bet2Rate, game = activeGame.game;
                var filteredBets = openBets === null || openBets === void 0 ? void 0 : openBets.filter(function (item) {
                    var _a, _b;
                    var eventDescription = ((_b = (_a = item.details) === null || _a === void 0 ? void 0 : _a.i) === null || _b === void 0 ? void 0 : _b[0].mt) || '';
                    return (eventDescription.toLowerCase().includes(team1Name === null || team1Name === void 0 ? void 0 : team1Name.toLowerCase()) ||
                        eventDescription.toLowerCase().includes(team2Name === null || team2Name === void 0 ? void 0 : team2Name.toLowerCase()));
                });
                var highBetCurrent = Math.max.apply(Math, [bet1Rate, bet2Rate]);
                var sameBetCheck = highBetCurrent < _this.sameBetRate;
                if (_this.gameConfig[game.trim()]) {
                    sameBetCheck = highBetCurrent <= _this.gameConfig[game].sameBetRate;
                }
                if ((filteredBets === null || filteredBets === void 0 ? void 0 : filteredBets.length) === 1 && sameBetCheck) {
                    /*
                     * the lowest main bet will be 5
                     * */
                    var isMainBet = filteredBets[0].s > 2.5;
                    return {
                        sameBet: true,
                        halfWinnings: null,
                        isMyOpenBetTeam1: null,
                        isMyOpenBetTeam2: null,
                        isMainBet: isMainBet,
                        firstBet: filteredBets[0].s,
                    };
                }
                return {
                    sameBet: false,
                    halfWinnings: null,
                    isMyOpenBetTeam1: null,
                    isMyOpenBetTeam2: null,
                    firstBet: 0,
                };
            },
        };
        this.$window = $window;
        Object.assign(this, main);
    }
    Utils.prototype.waitForFunction = function (func, option) {
        return __awaiter(this, void 0, void 0, function () {
            var _option;
            return __generator(this, function (_a) {
                _option = Object.assign({}, option || { timeout: 5000 });
                return [2 /*return*/, new Promise(function (resolve) {
                        var timer = 0;
                        var inter = setInterval(function () {
                            var isTrue = func();
                            //this.log({ waitForFunction: 'waitForFunction', isTrue, timer, timeout: _option.timeout });
                            if (timer > _option.timeout || isTrue) {
                                clearInterval(inter);
                                resolve(isTrue);
                            }
                            timer += 300;
                        }, 300);
                    })];
            });
        });
    };
    Utils.prototype.waitForCountdown = function (func, option) {
        return __awaiter(this, void 0, void 0, function () {
            var _option;
            return __generator(this, function (_a) {
                _option = Object.assign({}, option || { countdown: 5 });
                return [2 /*return*/, new Promise(function (resolve) {
                        var inter = setInterval(function () {
                            var isTrue = func(_option.countdown);
                            //this.log({ waitForFunction: 'waitForFunction', isTrue, timer, timeout: _option.timeout });
                            if (_option.countdown < 0) {
                                clearInterval(inter);
                                resolve(isTrue);
                            }
                            _option.countdown--;
                        }, 1000);
                    })];
            });
        });
    };
    Utils.prototype.waitForSelector = function (selector, option) {
        return __awaiter(this, void 0, void 0, function () {
            var _option;
            var _this = this;
            return __generator(this, function (_a) {
                _option = Object.assign({}, option || { timeout: 5000 });
                return [2 /*return*/, new Promise(function (resolve) {
                        var timer = 0;
                        var inter = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var el;
                            return __generator(this, function (_a) {
                                el = document.querySelector(selector);
                                if (timer > _option.timeout || !!el) {
                                    clearInterval(inter);
                                    resolve(el);
                                }
                                timer += 300;
                                return [2 /*return*/];
                            });
                        }); }, 300);
                    })];
            });
        });
    };
    Utils.prototype.waitForSelectorAll = function (selector, option) {
        return __awaiter(this, void 0, void 0, function () {
            var _option;
            var _this = this;
            return __generator(this, function (_a) {
                _option = Object.assign({}, option || { timeout: 5000 });
                return [2 /*return*/, new Promise(function (resolve) {
                        var timer = 0;
                        var inter = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var el;
                            return __generator(this, function (_a) {
                                el = document.querySelectorAll(selector);
                                if (timer > _option.timeout || el.length) {
                                    clearInterval(inter);
                                    resolve(el);
                                }
                                timer += 300;
                                return [2 /*return*/];
                            });
                        }); }, 300);
                    })];
            });
        });
    };
    Utils.prototype.waitForSelectorByTxt = function (tagName, text, option) {
        return __awaiter(this, void 0, void 0, function () {
            var _option;
            return __generator(this, function (_a) {
                _option = Object.assign({}, option || { timeout: 5000 });
                return [2 /*return*/, new Promise(function (resolve) {
                        var limit = 0;
                        var inter = setInterval(function () {
                            // @ts-ignore
                            var elem = __spreadArray([], document.querySelectorAll(tagName), true).find(function (el) { return el.textContent.includes(text); });
                            if (limit > _option.timeout || !!elem) {
                                clearInterval(inter);
                                resolve(elem);
                            }
                            limit += 1000;
                        }, 1000);
                    })];
            });
        });
    };
    Utils.prototype.delay = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) { return setTimeout(resolve, ms); })];
            });
        });
    };
    Utils.prototype.uniqBy = function (array, param) {
        var ids = array.map(function (item) { return item[param]; });
        return array.filter(function (item, index) { return !ids.includes(item[param], index + 1); });
    };
    Utils.prototype.getMyCash = function () {
        return __awaiter(this, void 0, void 0, function () {
            var el, bal;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitForSelector('#mk_top_Account span', { timeout: 2000 })];
                    case 1:
                        el = _a.sent();
                        if (el) {
                            bal = (el === null || el === void 0 ? void 0 : el.innerText) || '$0';
                            return [2 /*return*/, {
                                    sBal: bal,
                                    fBal: parseFloat(bal.replace('$', '')),
                                }];
                        }
                        return [2 /*return*/, {
                                sBal: '-$1',
                                fBal: -1,
                            }];
                }
            });
        });
    };
    Utils.prototype.getMyCashNoAsync = function () {
        var el = document.querySelector('#mk_top_Account span');
        if (el) {
            var bal = (el === null || el === void 0 ? void 0 : el.innerText) || '$0';
            return {
                sBal: bal,
                fBal: parseFloat(bal.replace('$', '')),
            };
        }
        return {
            sBal: '-$1',
            fBal: -1,
        };
    };
    Utils.prototype.waitClick = function (el) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            el.click();
                            resolve(el);
                        }, 1000);
                    })];
            });
        });
    };
    Utils.prototype.loading = function () {
        return __awaiter(this, void 0, void 0, function () {
            var res, nav;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log({ Action: 'Loading', Status: 'waiting...' });
                        return [4 /*yield*/, this.waitForFunction(function () {
                                // @ts-ignore
                                var loading = __spreadArray([], document.querySelectorAll('p'), true).filter(function (el) { return el.textContent.includes('Loading...'); });
                                return !loading.length;
                            }, { timeout: 600000 })];
                    case 1:
                        res = _a.sent();
                        return [4 /*yield*/, this.waitForSelector('.bto-sb-row .bto-sb-col-1', { timeout: 10000 })];
                    case 2:
                        nav = _a.sent();
                        if (nav) {
                            //nav.style.display = 'none';
                        }
                        return [2 /*return*/, res];
                }
            });
        });
    };
    Utils.prototype.hasPromo = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log({ Action: 'Checking Promo', Status: 'fetch' });
                        return [4 /*yield*/, fetch("https://playalberta.ca/api/es/search", {
                                headers: {
                                    'content-type': 'application/json',
                                },
                                body: JSON.stringify({
                                    size: 1,
                                    query: {
                                        query_string: {
                                            query: '+title:*bet and get* && ((+contentType:Game && +Game.isJackpotBanner:0 && !Game.isSports:Yes && !Game.isDbg:Yes) || (+contentType:Promo))',
                                        },
                                    },
                                }),
                                method: 'POST',
                            })
                                .then(function (r) {
                                return r.json();
                            })
                                .then(function (r) {
                                var filterCheck = r.contentlets.filter(function (item) {
                                    return ['bet-and-get-offer', 'double-bet-and-get-offer'].includes(item.urlTitle);
                                });
                                return filterCheck.length;
                            })
                                .catch(function () { return false; })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Utils.prototype.hasError = function () {
        var wentWrong = document.querySelector('.text-danger');
        return (!!document.querySelector('.mwc-popup-warn') ||
            (!!wentWrong && wentWrong.innerText === 'Something went wrong, please try again soon'));
    };
    Utils.prototype.isLoggedIn = function () {
        return __awaiter(this, void 0, void 0, function () {
            var $;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log({ Action: 'Checking Session', Status: '...' });
                        return [4 /*yield*/, this.getMyCash()];
                    case 1:
                        $ = _a.sent();
                        return [4 /*yield*/, this.waitForFunction(function () {
                                var user = JSON.parse(localStorage.getItem('NeoGames_128_USER_SESSION_CREDENTIALS') || 'null');
                                var re = new RegExp('"', 'g');
                                var twoFactorAuth = (localStorage.getItem('NeoGames_128_TFATDT') || '').replace(re, '');
                                if (user && $.fBal !== -1) {
                                    _this.$user = {
                                        ISID: user.ISID,
                                        EXTERNAL_PLAYER_ID: user.EXTERNAL_PLAYER_ID,
                                        TWO_FACTOR_AUTH: twoFactorAuth,
                                    };
                                    return true;
                                }
                                else {
                                    return false;
                                }
                            })];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Utils.prototype.getActiveAccount = function () {
        var Accounts = this.accounts; // end Accounts
        //LOU
        /*
         * change this if dev mode
         * */
        Accounts.dev = Accounts.AMOS;
        this.autoCashoutConfig = Accounts[this.account][2];
        return Accounts[this.account];
    };
    Utils.prototype.login = function () {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var loginBtn, user, userAccount, userEmail, userPword, twoFactorAuth, password, submit, ctr, inter;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        this.log({ Action: 'Login', Status: 'init' });
                        return [4 /*yield*/, this.waitForSelector('#mk_top_Login')];
                    case 1:
                        loginBtn = _c.sent();
                        if (!(loginBtn && this.canLogin)) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.waitClick(loginBtn)];
                    case 2:
                        _c.sent();
                        return [4 /*yield*/, this.isLoading()];
                    case 3:
                        _c.sent();
                        return [4 /*yield*/, this.delay(1000)];
                    case 4:
                        _c.sent();
                        return [4 /*yield*/, this.waitForSelector('#user')];
                    case 5:
                        user = _c.sent();
                        if (!user) return [3 /*break*/, 14];
                        userAccount = this.getActiveAccount();
                        userEmail = userAccount[0];
                        userPword = userAccount[1];
                        this.userSession = _userSession;
                        if (this.userSession) {
                            twoFactorAuth = ((_b = (_a = this.userSession.data) === null || _a === void 0 ? void 0 : _a.userSession) === null || _b === void 0 ? void 0 : _b.TWO_FACTOR_AUTH) || null;
                            window.localStorage.setItem('NeoGames_128_TFATDT', twoFactorAuth);
                        }
                        user.value = userEmail;
                        return [4 /*yield*/, this.inputValueSetter(user, userEmail)];
                    case 6:
                        _c.sent();
                        return [4 /*yield*/, this.waitForSelector('#password')];
                    case 7:
                        password = _c.sent();
                        if (!password) return [3 /*break*/, 9];
                        return [4 /*yield*/, this.inputValueSetter(password, userPword)];
                    case 8:
                        _c.sent();
                        _c.label = 9;
                    case 9: return [4 /*yield*/, this.waitForSelector('#submit')];
                    case 10:
                        submit = _c.sent();
                        this.log({ Action: 'Login', Status: "clicking submit ".concat(!!submit) });
                        return [4 /*yield*/, this.delay(1500)];
                    case 11:
                        _c.sent();
                        if (!submit) return [3 /*break*/, 14];
                        return [4 /*yield*/, this.waitClick(submit)];
                    case 12:
                        _c.sent();
                        return [4 /*yield*/, this.isLoading()];
                    case 13:
                        _c.sent();
                        _c.label = 14;
                    case 14:
                        ctr = 300;
                        inter = setInterval(function () { return __awaiter(_this, void 0, void 0, function () {
                            var _a, _b, _c, _d, _e, _f, _g;
                            return __generator(this, function (_h) {
                                switch (_h.label) {
                                    case 0:
                                        if (!this.canLogin) {
                                            ctr -= 50;
                                            this.log({
                                                Action: "There's currently an active session for this account",
                                                Status: "cant login waiting ".concat(ctr),
                                            });
                                        }
                                        else {
                                            ctr -= 5;
                                            this.log({ Action: 'Login', Status: "waiting ".concat(ctr) });
                                        }
                                        if (!this.hasError()) return [3 /*break*/, 2];
                                        return [4 /*yield*/, this.delay(1000)];
                                    case 1:
                                        _h.sent();
                                        (_a = document.querySelector('[modal-backdrop]')) === null || _a === void 0 ? void 0 : _a.remove();
                                        (_d = (_c = (_b = document.querySelector('[role="alertdialog"]')) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement) === null || _d === void 0 ? void 0 : _d.remove();
                                        (_f = (_e = document.querySelector('[role="alertdialog"]')) === null || _e === void 0 ? void 0 : _e.parentElement) === null || _f === void 0 ? void 0 : _f.remove();
                                        (_g = document.querySelector('[role="alertdialog"]')) === null || _g === void 0 ? void 0 : _g.remove();
                                        _h.label = 2;
                                    case 2:
                                        if (!(ctr <= 0)) return [3 /*break*/, 4];
                                        clearInterval(inter);
                                        return [4 /*yield*/, this.reload()];
                                    case 3:
                                        _h.sent();
                                        _h.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }, 5000);
                        return [4 /*yield*/, this.waitForFunction(function () {
                                return !!document.querySelector('#mk_top_Account span');
                            }, { timeout: 300000 })];
                    case 15:
                        _c.sent();
                        clearInterval(inter);
                        this.log({ Action: 'Login', Status: 'done' });
                        return [4 /*yield*/, this.reload()];
                    case 16:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Utils.prototype.getReactApi = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.log((_a = {}, _a[data.name] = data.value, _a.Status = "fetching", _a));
                        return [4 /*yield*/, new Promise(function (resolve) {
                                document.addEventListener('message', function (e) { return __awaiter(_this, void 0, void 0, function () {
                                    var message;
                                    return __generator(this, function (_a) {
                                        message = JSON.parse(e.data || null);
                                        if (message && message.event === data.name) {
                                            resolve(message.data);
                                        }
                                        return [2 /*return*/];
                                    });
                                }); });
                            })];
                    case 1: return [2 /*return*/, (_b.sent())];
                }
            });
        });
    };
    Utils.prototype.loopGetSettledBets = function (pageIndex, array) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getSettledBets(pageIndex)];
                    case 1:
                        res = _a.sent();
                        if (!(res === null || res === void 0 ? void 0 : res.length)) return [3 /*break*/, 4];
                        array = __spreadArray(__spreadArray([], array, true), res, true);
                        pageIndex++;
                        return [4 /*yield*/, this.delay(1500)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.loopGetSettledBets(pageIndex, array)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        if (res === null) {
                            return [2 /*return*/, null];
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/, array];
                }
            });
        });
    };
    Utils.prototype.getDates = function () {
        /*
        *    const today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
    
        const currentWeekDay = today.getDay();
        const lessDays = currentWeekDay === 0 ? 6 : currentWeekDay - 1;
        let weekStart = new Date(new Date(today).setDate(today.getDate() - lessDays));
        let weekEnd = new Date(new Date(weekStart).setDate(weekStart.getDate() + 6));
    
        weekStart = new Date(weekStart.getTime() - new Date().getTimezoneOffset() * 60000);
        weekEnd = new Date(weekEnd.getTime() - new Date().getTimezoneOffset() * 60000);
    
        weekStart.setUTCHours(0, 0, 0, 0);
        weekEnd.setUTCHours(23, 59, 59, 999);
    
        *
        *
        * */
        var today = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000);
        today.setUTCHours(0, 0, 0, 0);
        var currentWeekDay = today.getDay();
        var forWeekStart = new Date(today);
        forWeekStart.setUTCHours(0, 0, 0, 0);
        forWeekStart.setDate(today.getDate() - currentWeekDay);
        var weekStart = new Date(forWeekStart);
        weekStart.setUTCHours(0, 0, 0, 0);
        var weekStartSunday = new Date(forWeekStart);
        weekStartSunday.setUTCHours(0, 0, 0, 0);
        var forWeekEnd = new Date(weekStart);
        forWeekEnd.setUTCHours(0, 0, 0, 0);
        forWeekEnd.setDate(weekStart.getDate() + 6);
        var weekEnd = new Date(forWeekEnd);
        weekEnd.setUTCHours(23, 59, 59, 999);
        this.log({
            LOG: {
                today: today,
                weekStart: weekStart,
                weekEnd: weekEnd,
            },
        });
        return {
            today: today,
            weekStart: weekStart,
            weekEnd: weekEnd,
        };
    };
    Utils.prototype.getSettledBets = function (pageIndex) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, today, weekStart, weekEnd, url, headers, res;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = this.getDates(), today = _c.today, weekStart = _c.weekStart, weekEnd = _c.weekEnd;
                        this.log({
                            Action: 'Settled Bets',
                            Status: "fetching (".concat(pageIndex, ")"),
                            DateToday: today.toISOString(),
                            DateFrom: weekStart.toISOString(),
                            DateTo: weekEnd.toISOString(),
                        });
                        this.preventLogout(pageIndex);
                        url = "https://bo-core.sports.playalberta.ca/rest/FEWBetSlip/History?page=".concat(pageIndex, "&status[]=1&status[]=2&items=100&culture=en-CA&TimeOffset=0&fromDate=").concat(weekStart.toISOString(), "&toDate=").concat(weekEnd.toISOString());
                        headers = {
                            accept: 'application/json, text/plain, */*',
                            'accept-language': 'en-US,en;q=0.9',
                            externaluserid: ((_a = this.$user) === null || _a === void 0 ? void 0 : _a.EXTERNAL_PLAYER_ID) || '',
                            provider: '0',
                        };
                        this.log({
                            LOG: {
                                type: 'getSettledBets',
                                url: url,
                                headers: headers,
                            },
                        });
                        return [4 /*yield*/, fetch(url, {
                                headers: headers,
                            })
                                .then(function (r) { return r.json(); })
                                .then(function (r) {
                                return r || null;
                            })
                                .catch(function () { return null; })];
                    case 1:
                        res = _d.sent();
                        if (!res) return [3 /*break*/, 3];
                        return [4 /*yield*/, res.reduce(function (promise, item, index) { return __awaiter(_this, void 0, void 0, function () {
                                var _a, savedSettledBets;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, promise];
                                        case 1:
                                            _b.sent();
                                            _a = item;
                                            return [4 /*yield*/, this.getBetDetails(item.id, index, res.length, 'SettledBets')];
                                        case 2:
                                            _a.details = _b.sent();
                                            if (item.details) {
                                                savedSettledBets = this.getWithExpiry('settledBets') || [];
                                                savedSettledBets === null || savedSettledBets === void 0 ? void 0 : savedSettledBets.push(item);
                                                this.setWithExpiry('settledBets', savedSettledBets, weekEnd.getTime());
                                            }
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, Promise.resolve())];
                    case 2:
                        _d.sent();
                        if (res.length !== ((_b = res.filter(function (item) { var _a, _b; return ((_b = (_a = item.details) === null || _a === void 0 ? void 0 : _a.i) === null || _b === void 0 ? void 0 : _b.length) !== 0; })) === null || _b === void 0 ? void 0 : _b.length)) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, res];
                    case 3: return [2 /*return*/, res];
                }
            });
        });
    };
    Utils.prototype.loopGetOpenBets = function (pageIndex, array) {
        return __awaiter(this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delay(1500)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.getOpenBets(pageIndex)];
                    case 2:
                        res = _a.sent();
                        if (!(res === null || res === void 0 ? void 0 : res.length)) return [3 /*break*/, 4];
                        array = __spreadArray(__spreadArray([], array, true), res, true);
                        pageIndex++;
                        return [4 /*yield*/, this.loopGetOpenBets(pageIndex, array)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        if (res === null) {
                            return [2 /*return*/, null];
                        }
                        _a.label = 5;
                    case 5: return [2 /*return*/, array];
                }
            });
        });
    };
    Utils.prototype.getOpenBets = function (pageIndex) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var _c, today, weekStart, weekEnd, url, headers, res;
            var _this = this;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _c = this.getDates(), today = _c.today, weekStart = _c.weekStart, weekEnd = _c.weekEnd;
                        this.log({
                            Action: 'Open Bets',
                            Status: "fetching (".concat(pageIndex, ")"),
                            DateToday: today.toISOString(),
                            DateFrom: weekStart.toISOString(),
                            DateTo: weekEnd.toISOString(),
                        });
                        url = "https://bo-core.sports.playalberta.ca/rest/FEWBetSlip/History?page=".concat(pageIndex, "&status[]=0&status[]=4&items=100&culture=en-CA&TimeOffset=0");
                        headers = {
                            accept: 'application/json, text/plain, */*',
                            'accept-language': 'en-US,en;q=0.9',
                            externaluserid: ((_a = this.$user) === null || _a === void 0 ? void 0 : _a.EXTERNAL_PLAYER_ID) || '',
                            provider: '0',
                        };
                        this.log({
                            LOG: {
                                type: 'getOpenBets',
                                url: url,
                                headers: headers,
                            },
                        });
                        return [4 /*yield*/, fetch(url, {
                                headers: headers,
                            })
                                .then(function (r) { return r.json(); })
                                .then(function (r) {
                                return r || null;
                            })
                                .catch(function () { return null; })];
                    case 1:
                        res = _d.sent();
                        if (!res) return [3 /*break*/, 3];
                        return [4 /*yield*/, res.reduce(function (promise, item, index) { return __awaiter(_this, void 0, void 0, function () {
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0: return [4 /*yield*/, promise];
                                        case 1:
                                            _b.sent();
                                            _a = item;
                                            return [4 /*yield*/, this.getBetDetails(item.id, index, res.length, 'OpenBets')];
                                        case 2:
                                            _a.details = _b.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); }, Promise.resolve())];
                    case 2:
                        _d.sent();
                        if (res.length !== ((_b = res.filter(function (item) { var _a, _b; return ((_b = (_a = item.details) === null || _a === void 0 ? void 0 : _a.i) === null || _b === void 0 ? void 0 : _b.length) !== 0; })) === null || _b === void 0 ? void 0 : _b.length)) {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/, res];
                    case 3: return [2 /*return*/, res];
                }
            });
        });
    };
    Utils.prototype.getBetDetails = function (id, index, totalLength, from) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var savedSettledBets, foundBet, url, headers;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.log({
                            Action: "Bet Details ".concat(from),
                            Status: "fetching (".concat(index + 1, "/").concat(totalLength, ")"),
                        });
                        savedSettledBets = this.getWithExpiry('settledBets') || [];
                        foundBet = savedSettledBets === null || savedSettledBets === void 0 ? void 0 : savedSettledBets.find(function (item) { return item.id.toString() === id.toString(); });
                        if (!(foundBet && foundBet.details)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.delay(100)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, foundBet.details];
                    case 2: return [4 /*yield*/, this.delay(750)];
                    case 3:
                        _b.sent();
                        url = "https://bo-core.sports.playalberta.ca/rest/FEWBetSlip/HistoryDetails?Culture=en-CA&betSlipGroupID=".concat(id);
                        headers = {
                            accept: 'application/json, text/plain, */*',
                            'accept-language': 'en-US,en;q=0.9',
                            externaluserid: ((_a = this.$user) === null || _a === void 0 ? void 0 : _a.EXTERNAL_PLAYER_ID) || '',
                            provider: '0',
                        };
                        this.log({
                            LOG: {
                                type: 'getBetDetails',
                                url: url,
                                headers: headers,
                            },
                        });
                        return [4 /*yield*/, fetch(url, {
                                headers: headers,
                            })
                                .then(function (r) { return r.json(); })
                                .then(function (r) {
                                return r || null;
                            })
                                .catch(function () { return null; })];
                    case 4: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    Utils.prototype.clearBetSlip = function () {
        return __awaiter(this, void 0, void 0, function () {
            var clearBetBtn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.$user) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.waitForSelector('.bto-sb-delete', { timeout: 1000 })];
                    case 1:
                        clearBetBtn = _a.sent();
                        if (!clearBetBtn) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.waitClick(clearBetBtn)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    Utils.prototype.stopLoopIfError = function (ctr) {
        return __awaiter(this, void 0, void 0, function () {
            var alertdialog;
            return __generator(this, function (_a) {
                alertdialog = this.hasError();
                if (alertdialog) {
                    ctr = this.loopLimit;
                }
                return [2 /*return*/, ctr];
            });
        });
    };
    Utils.prototype.stopLoopIfLoading = function (ctr) {
        return __awaiter(this, void 0, void 0, function () {
            var loading;
            return __generator(this, function (_a) {
                loading = __spreadArray([], document.querySelectorAll('p'), true).find(function (el) { return el.textContent.includes('Loading...'); });
                if (loading) {
                    ctr = this.loopLimit;
                }
                return [2 /*return*/, ctr];
            });
        });
    };
    Utils.prototype.throttleFunction = function (func, delay) {
        // Previously called time of the function
        var prev = 0;
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // Current called time of the function
            var now = new Date().getTime();
            // Logging the difference between previously
            // called and current called timings
            console.log(now - prev, delay);
            // If difference is greater than delay call
            // the function again.
            if (now - prev > delay) {
                prev = now;
                // "..." is the spread operator here
                // returning the function with the
                // array of arguments
                return func.apply(void 0, args);
            }
        };
    };
    Utils.prototype.search = function (searchTerm) {
        return __awaiter(this, void 0, void 0, function () {
            var sofa;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log({ Search: searchTerm, gameListWithPrediction: this.gameListWithPrediction }); // <---- important log
                        return [4 /*yield*/, new Promise(function (resolve) {
                                document.addEventListener('message', function (e) { return __awaiter(_this, void 0, void 0, function () {
                                    var message;
                                    return __generator(this, function (_a) {
                                        message = JSON.parse(e.data || null);
                                        if (message && message.event === 'FromSearch') {
                                            resolve(message.data);
                                        }
                                        return [2 /*return*/];
                                    });
                                }); });
                            })];
                    case 1:
                        sofa = _a.sent();
                        return [4 /*yield*/, this.delay(1000)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, sofa];
                }
            });
        });
    };
    Utils.prototype.sort = function (divA, divB) {
        var teamA = this.$Game.getActiveGame(divA);
        var teamB = this.$Game.getActiveGame(divB);
        var t1 = Math.abs(teamA.team1Score - teamA.team2Score);
        var t2 = Math.abs(teamB.team1Score - teamB.team2Score);
        if (t1 < t2) {
            return 1;
        }
        if (t1 > t2) {
            return -1;
        }
        return 0;
    };
    Utils.prototype.findABet = function () {
        return __awaiter(this, void 0, void 0, function () {
            var gameList, foundItem, res;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        gameList = Array.from(document.querySelectorAll('.bto-sb-element .bto-sb-event-odds')).filter(function (item) {
                            return _this.$Game.isMoneyLine(item);
                        });
                        gameList = gameList.filter(function (item) {
                            var _a = _this.$Game.getActiveGame(item), isSuspended = _a.isSuspended, justBet = _a.justBet, badBet = _a.badBet;
                            return !isSuspended && !justBet && !badBet;
                        });
                        gameList = gameList.sort(function (ulA, ulB) {
                            return _this.sort(ulA, ulB);
                        });
                        foundItem = gameList.find(function (item) {
                            var activeGame = _this.$Game.getActiveGame(item);
                            var foundGame = _this.$Game.getBetMode(activeGame, [], _this.openBets).foundGame;
                            var sameBet = _this.$Game.checkSameGameBet(activeGame, [], _this.openBets).sameBet;
                            return foundGame || sameBet;
                        });
                        return [4 /*yield*/, Promise.all([foundItem].map(function (item) { return __awaiter(_this, void 0, void 0, function () {
                                var activeGame, game, team1Name, team2Name, spread, team1Score, team2Score, bet1Rate, bet2Rate, checkSameGameBet, l1, l2, team, singleBtn, betSlip, oddsSwitch;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (!item) {
                                                return [2 /*return*/, null];
                                            }
                                            activeGame = this.$Game.getActiveGame(item);
                                            game = activeGame.game, team1Name = activeGame.team1Name, team2Name = activeGame.team2Name, spread = activeGame.spread, team1Score = activeGame.team1Score, team2Score = activeGame.team2Score, bet1Rate = activeGame.bet1Rate, bet2Rate = activeGame.bet2Rate;
                                            checkSameGameBet = this.$Game.checkSameGameBet(activeGame, [], this.openBets);
                                            item.classList.add('justBet');
                                            item.classList.add("custom_".concat(team1Name.replace(/ /g, '-').replace('&', '-').replace(',', '-')));
                                            l1 = item === null || item === void 0 ? void 0 : item.querySelector('.bto-sb-event-odds-right .bto-sb-event-odds-cell:nth-child(1) span:nth-child(1)');
                                            l2 = item === null || item === void 0 ? void 0 : item.querySelector('.bto-sb-event-odds-right .bto-sb-event-odds-cell:nth-child(2) span:nth-child(1)');
                                            team = team1Name + ' @ ' + team2Name;
                                            if (checkSameGameBet.sameBet) {
                                                if (checkSameGameBet.isMainBet && bet1Rate < bet2Rate) {
                                                    l2 === null || l2 === void 0 ? void 0 : l2.click();
                                                }
                                                else if (checkSameGameBet.isMainBet && bet2Rate < bet1Rate) {
                                                    l1 === null || l1 === void 0 ? void 0 : l1.click();
                                                }
                                                else if (!checkSameGameBet.isMainBet && bet1Rate < bet2Rate) {
                                                    l1 === null || l1 === void 0 ? void 0 : l1.click();
                                                }
                                                else if (!checkSameGameBet.isMainBet && bet2Rate < bet1Rate) {
                                                    l2 === null || l2 === void 0 ? void 0 : l2.click();
                                                }
                                                else {
                                                    item.classList.add('badBet');
                                                    this.removeJustBetClass(team);
                                                    return [2 /*return*/, null];
                                                }
                                            }
                                            else {
                                                if (bet1Rate < bet2Rate) {
                                                    l1 === null || l1 === void 0 ? void 0 : l1.click();
                                                    /*await this.delay(500);
                                                    l2?.click();*/
                                                }
                                                else if (bet2Rate < bet1Rate) {
                                                    l2 === null || l2 === void 0 ? void 0 : l2.click();
                                                    /*await this.delay(500);
                                                    l1?.click();*/
                                                }
                                                else {
                                                    item.classList.add('badBet');
                                                    this.removeJustBetClass(team);
                                                    return [2 /*return*/, null];
                                                }
                                            }
                                            return [4 /*yield*/, this.waitForSelector('.bto-sb-betslip-nav a:nth-child(1)')];
                                        case 1:
                                            singleBtn = _a.sent();
                                            if (!singleBtn) return [3 /*break*/, 3];
                                            return [4 /*yield*/, this.waitClick(singleBtn)];
                                        case 2:
                                            _a.sent();
                                            _a.label = 3;
                                        case 3:
                                            if (!!checkSameGameBet.sameBet) return [3 /*break*/, 5];
                                            betSlip = JSON.parse(localStorage.getItem('betslip_v2') || 'null');
                                            if (!(betSlip && (betSlip.acceptOddChange === false || betSlip.acceptOddChange === 4))) return [3 /*break*/, 5];
                                            return [4 /*yield*/, this.waitForSelectorAll('.bto-sb-form-switch-slider')];
                                        case 4:
                                            oddsSwitch = _a.sent();
                                            if (oddsSwitch.length === 2) {
                                                Array.from(oddsSwitch)[0].click();
                                            }
                                            _a.label = 5;
                                        case 5:
                                            this.showMoneyLines();
                                            return [2 /*return*/, __assign({ bet1Rate: bet1Rate, bet2Rate: bet2Rate, team1Score: team1Score, team2Score: team2Score, spread: spread, game: game, team1Name: team1Name, team2Name: team2Name, team: team }, checkSameGameBet)];
                                    }
                                });
                            }); }))];
                    case 1:
                        res = _a.sent();
                        return [2 /*return*/, res.filter(function (item) { return !!item; })];
                }
            });
        });
    };
    Utils.prototype.allowLocation = function () {
        return __awaiter(this, void 0, void 0, function () {
            var needLocation, locationBtn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitForFunction(function () {
                            var _a;
                            return (((_a = document
                                .querySelector('[role="alertdialog"]')) === null || _a === void 0 ? void 0 : _a.innerText.toLowerCase().includes('location validation')) || false);
                        }, { timeout: 10000 })];
                    case 1:
                        needLocation = _a.sent();
                        this.log({
                            LOG: { allowLocation: !!needLocation },
                        });
                        if (!needLocation) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.waitForSelector('[role="alertdialog"] button[type="button"]', { timeout: 10000 })];
                    case 2:
                        locationBtn = _a.sent();
                        if (!locationBtn) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.waitClick(locationBtn)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Utils.prototype.removeJustBetClass = function (team) {
        var team1Name = team.split(' @ ')[0]; //list[0].team1Name + ' @ ' + list[0].team2Name;
        var selector = ".custom_".concat(team1Name.replace(/ /g, '-').replace('&', '-').replace(',', '-'));
        var el = document.querySelector(selector);
        if (el) {
            el.classList.remove('justBet');
        }
    };
    Utils.prototype.notificationPositionRight = function () {
        return __awaiter(this, void 0, void 0, function () {
            var notification;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitForSelector('.bto-sb-tost-notifications')];
                    case 1:
                        notification = _a.sent();
                        if (notification) {
                            notification.style.right = 0;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Utils.prototype.notificationsClose = function () {
        return __awaiter(this, void 0, void 0, function () {
            var notificationItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.delay(5000)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.waitForSelectorAll('.bto-sb-tost-notification-close')];
                    case 2:
                        notificationItems = _a.sent();
                        if (notificationItems.length) {
                            notificationItems.forEach(function (el) {
                                el === null || el === void 0 ? void 0 : el.click();
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Utils.prototype.notificationsStatus = function (success, warning, changed, error, team, betType) {
        if ((success === null || success === void 0 ? void 0 : success.length) === 1) {
            this.log({
                Action: "".concat(betType, " Placed"),
                Status: "".concat(team),
            });
        }
        else if ((warning === null || warning === void 0 ? void 0 : warning.length) === 1 || (changed === null || changed === void 0 ? void 0 : changed.length) === 1 || (error === null || error === void 0 ? void 0 : error.length) === 1) {
            this.log({
                Action: "".concat(betType, " Failed"),
                Status: "".concat(team),
            });
        }
    };
    Utils.prototype.betConfirm = function (startingFBal, team, bet, bet1Rate, bet2Rate, game) {
        return __awaiter(this, void 0, void 0, function () {
            var highBetRate, startCash, placeBet, hasWagerLimit, isSuccess, startCashBal, isWagerZero, $;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        highBetRate = Math.max.apply(Math, [bet1Rate, bet2Rate]);
                        this.log({
                            Action: "Confirming Bet(".concat(highBetRate, ")"),
                            Status: "".concat(team),
                        });
                        return [4 /*yield*/, this.getMyCash()];
                    case 1:
                        startCash = _a.sent();
                        return [4 /*yield*/, this.notificationsClose()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.waitForSelector('.bto-sb-place')];
                    case 3:
                        placeBet = _a.sent();
                        if (!placeBet) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.waitClick(placeBet)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.allowLocation()];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.notificationPositionRight()];
                    case 7:
                        _a.sent();
                        hasWagerLimit = false;
                        isSuccess = false;
                        startCashBal = startCash.fBal;
                        isWagerZero = false;
                        return [4 /*yield*/, this.waitForFunction(function () {
                                var fBal = _this.getMyCashNoAsync().fBal;
                                //bto-sb-tost-notification bto-sb-tost-notifications-success bto-sb-tost-notification-link
                                //bto-sb-tost-notification bto-sb-tost-notifications-info bto-sb-tost-notification-link
                                //bto-sb-tost-notification bto-sb-tost-notifications-warning
                                //bto-sb-tost-notification bto-sb-tost-notification-changed
                                var success = document.querySelectorAll('.bto-sb-tost-notifications-success');
                                var warning = document.querySelectorAll('.bto-sb-tost-notifications-warning');
                                var changed = document.querySelectorAll('.bto-sb-tost-notification-changed');
                                var error = document.querySelectorAll('.bto-sb-tost-notifications-error');
                                if (error && error.length) {
                                    hasWagerLimit =
                                        Array.from(error).filter(function (item) {
                                            var _a, _b, _c, _d;
                                            var youAllowed = ((_a = item.innerText) === null || _a === void 0 ? void 0 : _a.toLowerCase().includes('you have allowed')) ||
                                                ((_b = item.innerText) === null || _b === void 0 ? void 0 : _b.toLowerCase().includes('cad of wager amount on this combination'));
                                            if (youAllowed) {
                                                isWagerZero = parseInt(((_d = (_c = item.innerText) === null || _c === void 0 ? void 0 : _c.match(/\d+/)) === null || _d === void 0 ? void 0 : _d[0]) || '0', 10) === 0;
                                            }
                                            return youAllowed;
                                        }).length !== 0;
                                }
                                if (startCashBal < fBal) {
                                    startCashBal = fBal;
                                }
                                isSuccess = (success === null || success === void 0 ? void 0 : success.length) === 1 || fBal < startCashBal;
                                _this.notificationsStatus(success, warning, changed, error, team, 'MainBet');
                                return isSuccess || (error === null || error === void 0 ? void 0 : error.length) === 1 || (warning === null || warning === void 0 ? void 0 : warning.length) === 1 || (changed === null || changed === void 0 ? void 0 : changed.length) === 1;
                            }, {
                                timeout: 30000,
                            })];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.notificationsClose()];
                    case 9:
                        _a.sent();
                        if (hasWagerLimit) {
                            this.setWithExpiry('hasWagerLimit', 'true', new Date().getTime() + 3.6e6); // 1 hr
                        }
                        return [4 /*yield*/, this.getMyCash()];
                    case 10:
                        $ = _a.sent();
                        this.log({ MyCashAfterBet: $.sBal });
                        this.showMoneyLines();
                        if (startingFBal === $.fBal) {
                            this.removeJustBetClass(team);
                        }
                        this.log({
                            LOG: {
                                betConfirm: isSuccess,
                            },
                        });
                        return [2 /*return*/, [isSuccess, isWagerZero]];
                }
            });
        });
    };
    Utils.prototype.betConfirmSameBet = function (startingFBal, team, bet, bet1Rate, bet2Rate, game) {
        return __awaiter(this, void 0, void 0, function () {
            var highBetRate, placeBet, isSuccess, startCash, startCashBal, $;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        highBetRate = Math.max.apply(Math, [bet1Rate, bet2Rate]);
                        this.log({
                            Action: "Confirming SameBet(".concat(highBetRate, ")"),
                            Status: "".concat(team),
                        });
                        return [4 /*yield*/, this.waitForSelector('.bto-sb-place')];
                    case 1:
                        placeBet = _a.sent();
                        if (!placeBet) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.waitClick(placeBet)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [4 /*yield*/, this.allowLocation()];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.notificationPositionRight()];
                    case 5:
                        _a.sent();
                        isSuccess = false;
                        return [4 /*yield*/, this.getMyCash()];
                    case 6:
                        startCash = _a.sent();
                        startCashBal = startCash.fBal;
                        return [4 /*yield*/, this.waitForFunction(function () {
                                var fBal = _this.getMyCashNoAsync().fBal;
                                var success = document.querySelectorAll('.bto-sb-tost-notifications-success');
                                var warning = document.querySelectorAll('.bto-sb-tost-notifications-warning');
                                var changed = document.querySelectorAll('.bto-sb-tost-notification-changed');
                                var error = document.querySelectorAll('.bto-sb-tost-notifications-error');
                                if (startCashBal < fBal) {
                                    startCashBal = fBal;
                                }
                                isSuccess = (success === null || success === void 0 ? void 0 : success.length) === 1 || fBal < startCashBal;
                                _this.notificationsStatus(success, warning, changed, error, team, 'SameBet');
                                return isSuccess || (error === null || error === void 0 ? void 0 : error.length) === 1 || (warning === null || warning === void 0 ? void 0 : warning.length) === 1 || (changed === null || changed === void 0 ? void 0 : changed.length) === 1;
                            }, {
                                timeout: 30000,
                            })];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, this.notificationsClose()];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, this.delay(1000)];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.getMyCash()];
                    case 10:
                        $ = _a.sent();
                        this.log({ MyCashAfterBet: $.sBal });
                        this.showMoneyLines();
                        if (startingFBal === $.fBal) {
                            this.removeJustBetClass(team);
                        }
                        this.log({
                            LOG: {
                                betConfirmSameBet: isSuccess,
                            },
                        });
                        return [2 /*return*/, isSuccess];
                }
            });
        });
    };
    Utils.prototype.sumArray = function (numbers) {
        return (numbers === null || numbers === void 0 ? void 0 : numbers.reduce(function (partialSum, a) { return partialSum + a; }, 0)) || 0;
    };
    Utils.prototype.setWithExpiry = function (key, value, ms) {
        var item = {
            value: value,
            expiry: ms,
        };
        window.localStorage.setItem(key, JSON.stringify(item));
    };
    Utils.prototype.getWithExpiry = function (key) {
        var itemStr = window.localStorage.getItem(key);
        // if the item doesn't exist, return null
        if (!itemStr) {
            return null;
        }
        var item = JSON.parse(itemStr);
        var tz = new Date().getTimezoneOffset() * 60000;
        var now = new Date(new Date().getTime() - tz);
        // compare the expiry time of the item with the current time
        this.log({
            LOG: {
                getWithExpiry: now.getTime() > item.expiry,
            },
        });
        console.log('gaga-----keykeykey--------------------------------', now.getTime() > item.expiry, item.expiry);
        if (now.getTime() > item.expiry) {
            // If the item is expired, delete the item from storage
            // and return null
            window.localStorage.removeItem(key);
            return null;
        }
        return item.value;
    };
    Utils.prototype.getTotalStaked = function () {
        var _a;
        if (this.settledBets) {
            var settledStaked = this.sumArray(this.settledBets.map(function (betItem) { return betItem.s; }));
            var openBetStaked = this.sumArray((_a = this.openBets) === null || _a === void 0 ? void 0 : _a.map(function (betItem) { return betItem.s; }));
            return settledStaked + openBetStaked;
        }
        return this.stakeLimit;
    };
    Utils.prototype.getTotalEarnings = function () {
        if (this.settledBets) {
            var totalStaked = this.sumArray(this.settledBets.map(function (betItem) { return (betItem === null || betItem === void 0 ? void 0 : betItem.s) || 0; }));
            var totalWinnings = this.sumArray(this.settledBets.map(function (betItem) { return (betItem === null || betItem === void 0 ? void 0 : betItem.w) || 0; }));
            return totalWinnings - totalStaked;
        }
        return 0;
    };
    Utils.prototype.getUserData = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var userSession, COR, GPD, _b, resCOR, resGPD, autoCashout, hasAutoCashout;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        userSession = JSON.parse(localStorage.getItem('NeoGames_128_USER_SESSION_CREDENTIALS') || 'null');
                        this.log({ Action: 'UserDetails', Status: 'fetching' });
                        COR = fetch('https://gamesrv1.playalberta.ca/ScratchCards/sapi.aspx?cm=CORM&CSI=128&LNG=ENG&MMI=0&PlayMode=M&rst=j', {
                            headers: {
                                accept: 'application/json, text/plain, */*',
                                'accept-language': 'en-US,en;q=0.9',
                                'content-type': 'application/x-www-form-urlencoded',
                            },
                            referrer: 'https://playalberta.ca/',
                            referrerPolicy: 'strict-origin-when-cross-origin',
                            body: "ISID=".concat(userSession === null || userSession === void 0 ? void 0 : userSession.ISID),
                            method: 'POST',
                            credentials: 'include',
                        })
                            .then(function (r) { return r.json(); })
                            .catch(function (err) {
                            return { error: true, err: err };
                        });
                        GPD = fetch('https://gamesrv1.playalberta.ca/ScratchCards/sapi.aspx?cm=GPD&CSI=128&LNG=ENG&PlayMode=M&rst=j', {
                            headers: {
                                accept: 'application/json, text/plain, */*',
                                'accept-language': 'en-US,en;q=0.9',
                                'content-type': 'application/x-www-form-urlencoded',
                            },
                            referrer: 'https://playalberta.ca/',
                            referrerPolicy: 'strict-origin-when-cross-origin',
                            body: "ISID=".concat(userSession === null || userSession === void 0 ? void 0 : userSession.ISID),
                            method: 'POST',
                            credentials: 'include',
                        })
                            .then(function (r) { return r.json(); })
                            .catch(function (err) {
                            return { error: true, err: err };
                        });
                        return [4 /*yield*/, Promise.all([COR, GPD])];
                    case 1:
                        _b = _c.sent(), resCOR = _b[0], resGPD = _b[1];
                        if (resGPD && resGPD.S2C && resGPD.S2C.PLAYER && resGPD.S2C.PLAYER.USERNAME && !resGPD.error) {
                            this.log({ Action: 'UserDetails', Status: 'Success' });
                            autoCashout = void 0;
                            if (this.autoCashoutConfig && resCOR && resGPD.S2C && !resCOR.error) {
                                hasAutoCashout = (_a = resCOR.S2C.CORS.TRN) === null || _a === void 0 ? void 0 : _a.find(function (cor) {
                                    var _a, _b;
                                    return ((_a = cor.PaymentAccountEmail) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === ((_b = _this.autoCashoutConfig) === null || _b === void 0 ? void 0 : _b.cashoutEmail.toLowerCase());
                                });
                                if (hasAutoCashout) {
                                    autoCashout = this.autoCashoutConfig;
                                }
                            }
                            return [2 /*return*/, __assign(__assign(__assign({ cash: parseFloat(resGPD.S2C.PLAYER.BALANCE || '0.00'), cashout: parseFloat(resGPD.S2C.PLAYER.ACA || '0.00'), autoCashout: autoCashout }, { Email: resGPD.S2C.PLAYER.USERNAME }), userSession), this.$user)];
                        }
                        this.log({ Action: 'UserDetails', Status: 'Failed' });
                        return [2 /*return*/, null];
                }
            });
        });
    };
    Utils.prototype.autoCashoutProcess = function (UserSession) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var currentAbleToCashout, isAbleToCashout, userSession, email;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.log({ Action: 'CashOut', Status: 'checking' });
                        this.log({
                            LOG: {
                                UserSession: UserSession,
                            },
                        });
                        if (UserSession && !UserSession.autoCashout) {
                            return [2 /*return*/, null];
                        }
                        currentAbleToCashout = UserSession.cashout - UserSession.autoCashout.maintainCash;
                        isAbleToCashout = currentAbleToCashout >= UserSession.autoCashout.withdrawAllIfCashGTE;
                        if (!isAbleToCashout) {
                            return [2 /*return*/, null];
                        }
                        userSession = JSON.parse(localStorage.getItem('NeoGames_128_USER_SESSION_CREDENTIALS') || 'null');
                        this.log({ Action: 'CashOut', Status: 'processing' });
                        email = encodeURIComponent(UserSession.autoCashout.cashoutEmail.toLowerCase());
                        return [4 /*yield*/, fetch("https://gamesrv1.playalberta.ca/ScratchCards/sapi.aspx?cm=COR&AccountEmail=".concat(email, "&CSI=12&&IUA=neow&IsCancelTransactionAllowed=0&LNG=ENG&Method=Interac+E-Transfer&PlayMode=M&rst=j"), {
                                headers: {
                                    accept: 'application/json, text/plain, */*',
                                    'accept-language': 'en-US,en;q=0.9',
                                    'content-type': 'application/x-www-form-urlencoded',
                                },
                                body: "ISID=".concat(userSession === null || userSession === void 0 ? void 0 : userSession.ISID, "&AccountNo=").concat(email, "&Amount=").concat(Math.floor(((_a = UserSession.autoCashout) === null || _a === void 0 ? void 0 : _a.fixedAmount) || currentAbleToCashout)),
                                method: 'POST',
                                credentials: 'include',
                            })
                                .then(function (r) { return r.json(); })
                                .catch(function (err) {
                                return { error: true, err: err };
                            })];
                    case 1: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    Utils.prototype.waitProcessing = function (timeout) {
        if (timeout === void 0) { timeout = 30000; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitForFunction(function () {
                            var _a;
                            return ((_a = document.querySelector('.processing')) === null || _a === void 0 ? void 0 : _a.style.display) === 'none';
                        }, { timeout: timeout })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Utils.prototype.isLoading = function (timeout) {
        if (timeout === void 0) { timeout = 30000; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.waitForFunction(function () {
                            var _a;
                            return ((_a = document.querySelector('#loadingScreen')) === null || _a === void 0 ? void 0 : _a.style.display) === 'none';
                        }, { timeout: timeout })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Utils.prototype.inputValueSetter = function (elem, value) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var valueSetter, prototype, prototypeValueSetter;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        valueSetter = (_a = Object.getOwnPropertyDescriptor(elem, 'value')) === null || _a === void 0 ? void 0 : _a.set;
                        prototype = Object.getPrototypeOf(elem);
                        prototypeValueSetter = (_b = Object.getOwnPropertyDescriptor(prototype, 'value')) === null || _b === void 0 ? void 0 : _b.set;
                        if (!valueSetter && prototypeValueSetter) {
                            prototypeValueSetter === null || prototypeValueSetter === void 0 ? void 0 : prototypeValueSetter.call(elem, value);
                        }
                        else if (valueSetter) {
                            valueSetter === null || valueSetter === void 0 ? void 0 : valueSetter.call(elem, value);
                        }
                        else if (elem) {
                            elem.value = value;
                            Object.defineProperty(elem, 'value', {
                                get: function () {
                                    return value;
                                },
                            });
                        }
                        elem === null || elem === void 0 ? void 0 : elem.dispatchEvent(new Event('input', {
                            bubbles: true,
                        }));
                        elem === null || elem === void 0 ? void 0 : elem.dispatchEvent(new Event('change', {
                            bubbles: true,
                        }));
                        return [4 /*yield*/, this.delay(500)];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Utils.prototype.getSecondBet = function (highBetRate, bet) {
        /*
         * max 2.5
         * */
        var stringSecondBetCeil = (bet * (1 + 0.01)).toFixed(1);
        var floatSecondBetCeil = parseFloat(stringSecondBetCeil);
        var stringMaxSameBet = floatSecondBetCeil / 11;
        var floatMaxSameBet = parseFloat(stringMaxSameBet.toFixed(1));
        var stringSecondBet = (floatSecondBetCeil / highBetRate).toFixed(1);
        var floatSecondBet = parseFloat(stringSecondBet);
        this.log({
            LOG: {
                getSecondBet: bet,
                floatMaxSameBet: floatMaxSameBet,
                floatSecondBet: floatSecondBet,
                highBetRate: highBetRate,
                floatSecondBetCeil: floatSecondBetCeil,
            },
        });
        return floatSecondBet > floatMaxSameBet ? floatMaxSameBet : floatSecondBet < 0.1 ? 0.1 : floatSecondBet;
    };
    Utils.prototype.getCurrentBetRate = function () {
        var _a, _b, _c;
        var div = (_c = (_b = (_a = document.querySelector('.bto-sb-element .bto-sb-event-odd-active')) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.parentElement;
        var bet1RateEl = div === null || div === void 0 ? void 0 : div.querySelector('.bto-sb-event-odds-right .bto-sb-event-odds-cell:nth-child(1) span:nth-child(1)');
        var bet2RateEl = div === null || div === void 0 ? void 0 : div.querySelector('.bto-sb-event-odds-right .bto-sb-event-odds-cell:nth-child(2) span:nth-child(1)');
        var bet1Rate = (bet1RateEl === null || bet1RateEl === void 0 ? void 0 : bet1RateEl.innerText) || '-1';
        var bet2Rate = (bet2RateEl === null || bet2RateEl === void 0 ? void 0 : bet2RateEl.innerText) || '-2';
        var currentBetRate1 = parseFloat(bet1Rate);
        var currentBetRate2 = parseFloat(bet2Rate);
        var highBetRate = Math.max.apply(Math, [currentBetRate1, currentBetRate2]);
        var lowBetRate = Math.min.apply(Math, [currentBetRate1, currentBetRate2]);
        return { highBetRate: highBetRate, lowBetRate: lowBetRate };
    };
    Utils.prototype.setBet = function (team, bet, bet1Rate, bet2Rate, game) {
        return __awaiter(this, void 0, void 0, function () {
            var mainBet, highBetRate, lowBetRate, currentBetRate, stake1, mainBetString, isSetBetPass, betRate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mainBet = bet;
                        highBetRate = Math.max.apply(Math, [bet1Rate, bet2Rate]);
                        lowBetRate = Math.min.apply(Math, [bet1Rate, bet2Rate]);
                        return [4 /*yield*/, this.waitForSelector('.bto-sb-betslip-events')];
                    case 1:
                        _a.sent();
                        currentBetRate = this.getCurrentBetRate();
                        this.log({
                            Action: "Setting Bet(".concat(currentBetRate.highBetRate, "/").concat(currentBetRate.lowBetRate, ")"),
                            Status: "".concat(team),
                        });
                        stake1 = document.querySelector('.bto-sb-betslip-events .bto-sb-betslip-event:nth-child(1) input');
                        mainBetString = mainBet.toString();
                        //const secondBetString = secondBet.toString();
                        return [4 /*yield*/, this.inputValueSetter(stake1, mainBetString)];
                    case 2:
                        //const secondBetString = secondBet.toString();
                        _a.sent();
                        return [4 /*yield*/, this.waitForFunction(function () {
                                var footer = document.querySelector('.bto-sb-betslip-footer');
                                var betSlip = document.querySelector('.bto-sb-betslip-content');
                                return ((footer === null || footer === void 0 ? void 0 : footer.innerText.toLowerCase().includes('to win')) && !(betSlip === null || betSlip === void 0 ? void 0 : betSlip.innerText.toLowerCase().includes('3-way')));
                            }, { timeout: 15000 })];
                    case 3:
                        isSetBetPass = _a.sent();
                        betRate = this.getCurrentBetRate();
                        return [2 /*return*/, !!isSetBetPass && betRate.highBetRate >= highBetRate && betRate.lowBetRate >= lowBetRate];
                }
            });
        });
    };
    Utils.prototype.setBetSameBet = function (team, bet, bet1Rate, bet2Rate, isMainBet, game) {
        return __awaiter(this, void 0, void 0, function () {
            var highBetRate, secondBet, mainBet, currentBetRate1El, currentBetRate1ElTxt, currentBetRate1, stake1, mainBetString, isSetBetPass, betRate, gameCheckPass;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        highBetRate = Math.max.apply(Math, [bet1Rate, bet2Rate]);
                        secondBet = this.getSecondBet(highBetRate, bet);
                        mainBet = isMainBet ? secondBet : bet;
                        currentBetRate1El = document.querySelector('.bto-sb-betslip-events .bto-sb-betslip-event:nth-child(1) .bto-sb-betslip-event-odds');
                        currentBetRate1ElTxt = (currentBetRate1El === null || currentBetRate1El === void 0 ? void 0 : currentBetRate1El.innerText) || '-1';
                        currentBetRate1 = parseFloat(currentBetRate1ElTxt);
                        this.log({
                            Action: "Setting SameBet(".concat(currentBetRate1, ")"),
                            Status: "".concat(team),
                        });
                        stake1 = document.querySelector('.bto-sb-betslip-events .bto-sb-betslip-event:nth-child(1) input');
                        mainBetString = mainBet.toString();
                        return [4 /*yield*/, this.inputValueSetter(stake1, mainBetString)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.waitForFunction(function () {
                                var footer = document.querySelector('.bto-sb-betslip-footer');
                                var betSlip = document.querySelector('.bto-sb-betslip-content');
                                return ((footer === null || footer === void 0 ? void 0 : footer.innerText.toLowerCase().includes('to win')) && !(betSlip === null || betSlip === void 0 ? void 0 : betSlip.innerText.toLowerCase().includes('3-way')));
                            }, { timeout: 15000 })];
                    case 2:
                        isSetBetPass = _a.sent();
                        betRate = this.getCurrentBetRate();
                        gameCheckPass = false;
                        if (this.gameConfig[game]) {
                            gameCheckPass = !!isSetBetPass && betRate.highBetRate <= this.gameConfig[game].highBetRate;
                        }
                        /*
                         * additional check
                         * */
                        return [2 /*return*/, (!!isSetBetPass && betRate.highBetRate < this.sameBetRate) || gameCheckPass];
                }
            });
        });
    };
    Utils.prototype.preventLogout = function (ctr) {
        if (ctr % 2 === 0) {
            window.scrollTo({
                top: 500,
                behavior: 'smooth',
            });
        }
        else {
            window.scrollTo({
                top: 501,
                behavior: 'smooth',
            });
        }
    };
    Utils.prototype.inProgressGameBotLoop = function (ctr) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function () {
            var sBal, foundBet, team, game, bet1Rate, bet2Rate, sameBet, isMainBet, firstBet, fBal, bet, highBetRate, secondBet, totalStaked, hasWagerLimit, isBetSuccess, isWagerZero, betSettled, betSettled, newOpenBetList, _d;
            var _e;
            var _this = this;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.waitForSelector('.bto-sb-element', { timeout: 60000 })];
                    case 1:
                        _f.sent();
                        return [4 /*yield*/, this.stopLoopIfError(ctr)];
                    case 2:
                        ctr = _f.sent();
                        if (!(ctr % 10 === 0 && this.$user)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getMyCash()];
                    case 3:
                        sBal = (_f.sent()).sBal;
                        this.log({ MyCash: sBal, MyCashAfterBet: sBal });
                        _f.label = 4;
                    case 4:
                        this.preventLogout(ctr);
                        this.log({
                            Action: 'Game Loop',
                            Status: "".concat(ctr, " / ").concat(this.loopLimit),
                        });
                        this.showMoneyLines();
                        if (!this.$user) return [3 /*break*/, 27];
                        return [4 /*yield*/, this.findABet()];
                    case 5:
                        foundBet = _f.sent();
                        if (!(foundBet && foundBet.length === 1)) return [3 /*break*/, 27];
                        team = foundBet[0].team;
                        game = foundBet[0].game;
                        bet1Rate = foundBet[0].bet1Rate;
                        bet2Rate = foundBet[0].bet2Rate;
                        sameBet = foundBet[0].sameBet;
                        isMainBet = foundBet[0].isMainBet;
                        firstBet = foundBet[0].firstBet;
                        this.log({
                            Action: 'Setting Bet',
                            Status: "".concat(team),
                        });
                        /*const stake1 = document.querySelector<HTMLInputElement>(
                          '.bto-sb-betslip-events .bto-sb-betslip-event:nth-child(1) input'
                        );
                
                        const stake2 = document.querySelector<HTMLInputElement>(
                          '.bto-sb-betslip-events .bto-sb-betslip-event:nth-child(2) input'
                        );
                
                        await this.inputValueSetter(stake1, '1');
                        await this.inputValueSetter(stake2, '2');*/
                        return [4 /*yield*/, this.delay(1500)];
                    case 6:
                        /*const stake1 = document.querySelector<HTMLInputElement>(
                          '.bto-sb-betslip-events .bto-sb-betslip-event:nth-child(1) input'
                        );
                
                        const stake2 = document.querySelector<HTMLInputElement>(
                          '.bto-sb-betslip-events .bto-sb-betslip-event:nth-child(2) input'
                        );
                
                        await this.inputValueSetter(stake1, '1');
                        await this.inputValueSetter(stake2, '2');*/
                        _f.sent();
                        return [4 /*yield*/, this.getMyCash()];
                    case 7:
                        fBal = (_f.sent()).fBal;
                        bet = this.bet;
                        highBetRate = Math.max.apply(Math, [bet1Rate, bet2Rate]);
                        secondBet = this.getSecondBet(highBetRate, bet);
                        totalStaked = this.getTotalStaked();
                        hasWagerLimit = this.getWithExpiry('hasWagerLimit');
                        if (hasWagerLimit) {
                            bet = 5;
                            secondBet = this.getSecondBet(highBetRate, bet);
                        }
                        if (!((fBal > 0 &&
                            fBal > bet + secondBet &&
                            totalStaked < this.stakeLimit &&
                            ((_b = (_a = this.userSession) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.weekStatus.done) !== true) ||
                            sameBet)) return [3 /*break*/, 24];
                        isBetSuccess = false;
                        isWagerZero = false;
                        if (!sameBet) return [3 /*break*/, 12];
                        bet = firstBet;
                        return [4 /*yield*/, this.setBetSameBet(team, bet, bet1Rate, bet2Rate, isMainBet, game)];
                    case 8:
                        betSettled = _f.sent();
                        if (!betSettled) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.betConfirmSameBet(fBal, team, bet, bet1Rate, bet2Rate, game)];
                    case 9:
                        isBetSuccess = _f.sent();
                        return [3 /*break*/, 11];
                    case 10:
                        this.removeJustBetClass(team);
                        _f.label = 11;
                    case 11: return [3 /*break*/, 16];
                    case 12: return [4 /*yield*/, this.setBet(team, bet, bet1Rate, bet2Rate, game)];
                    case 13:
                        betSettled = _f.sent();
                        if (!betSettled) return [3 /*break*/, 15];
                        return [4 /*yield*/, this.betConfirm(fBal, team, bet, bet1Rate, bet2Rate, game)];
                    case 14:
                        _e = _f.sent(), isBetSuccess = _e[0], isWagerZero = _e[1];
                        return [3 /*break*/, 16];
                    case 15:
                        this.removeJustBetClass(team);
                        _f.label = 16;
                    case 16:
                        if (!isBetSuccess) return [3 /*break*/, 21];
                        return [4 /*yield*/, this.waitForCountdown(function (countdown) {
                                _this.log({
                                    Action: "Done Betting",
                                    Status: "waiting ".concat(countdown, " sec"),
                                });
                                return false;
                            }, { countdown: 10 })];
                    case 17:
                        _f.sent();
                        return [4 /*yield*/, this.loopGetOpenBets(1, [])];
                    case 18:
                        newOpenBetList = _f.sent();
                        if (!(newOpenBetList && newOpenBetList.length)) return [3 /*break*/, 20];
                        this.openBets = newOpenBetList === null || newOpenBetList === void 0 ? void 0 : newOpenBetList.filter(function (item) { var _a, _b; return !item.bty.includes('FreeBet') && ((_b = (_a = item.details) === null || _a === void 0 ? void 0 : _a.i) === null || _b === void 0 ? void 0 : _b[0].s) === 'Placed'; });
                        _d = this;
                        return [4 /*yield*/, this.loopGetSettledBets(1, [])];
                    case 19:
                        _d.settledBets = _f.sent();
                        this.settledBets = (_c = this.settledBets) === null || _c === void 0 ? void 0 : _c.filter(function (item) {
                            var _a, _b;
                            var status = (_b = (_a = item.details) === null || _a === void 0 ? void 0 : _a.i) === null || _b === void 0 ? void 0 : _b[0].s;
                            return !item.bty.includes('FreeBet') && ['Won', 'Lost'].includes(status);
                        });
                        _f.label = 20;
                    case 20:
                        this.log({ OpenBets: this.openBets, SettledBets: this.settledBets });
                        return [3 /*break*/, 22];
                    case 21:
                        if (isWagerZero) {
                            /*
                             * do nothing,
                             * dont remove the just bet
                             * */
                        }
                        else {
                            this.removeJustBetClass(team);
                        }
                        _f.label = 22;
                    case 22:
                        this.showMoneyLines();
                        return [4 /*yield*/, this.clearBetSlip()];
                    case 23:
                        _f.sent();
                        return [3 /*break*/, 27];
                    case 24:
                        if (!(this.getTotalStaked() >= this.stakeLimit || fBal < bet + secondBet)) return [3 /*break*/, 26];
                        /*
                         * this is just to maintain justBet class
                         * */
                        return [4 /*yield*/, this.clearBetSlip()];
                    case 25:
                        /*
                         * this is just to maintain justBet class
                         * */
                        _f.sent();
                        return [3 /*break*/, 27];
                    case 26:
                        this.removeJustBetClass(team);
                        _f.label = 27;
                    case 27:
                        if (!(ctr.toString() !== this.loopLimit.toString())) return [3 /*break*/, 29];
                        ctr++;
                        return [4 /*yield*/, this.inProgressGameBotLoop(ctr)];
                    case 28: return [2 /*return*/, _f.sent()];
                    case 29: return [2 /*return*/, true];
                }
            });
        });
    };
    Utils.prototype.inProgressGameBot = function () {
        return __awaiter(this, void 0, void 0, function () {
            var menu, parley, liveSports;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log({ Action: 'Initializing Game Loop', Status: "waiting..." });
                        menu = document.querySelector('.bto-sb-col-1');
                        parley = document.querySelector('.bto-sb-widget-betbuilder-list');
                        liveSports = document.querySelector('.bto-sb-col-2');
                        if (menu) {
                            menu.style.display = 'none';
                        }
                        if (parley) {
                            parley.style.display = 'none';
                        }
                        if (liveSports) {
                            liveSports.style.minWidth = '420px';
                            liveSports.style.maxWidth = '420px';
                        }
                        return [4 /*yield*/, this.clearBetSlip()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.inProgressGameBotLoop(0)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Utils.prototype.showMoneyLines = function () {
        var _this = this;
        var gameList = Array.from(document.querySelectorAll('.bto-sb-element .bto-sb-event-odds')).filter(function (item) {
            return _this.$Game.isMoneyLine(item);
        });
        gameList = gameList.sort(function (divA, divB) {
            return _this.sort(divA, divB);
        });
        var MoneyLines = gameList.map(function (div) {
            var _a, _b;
            var activeGame = _this.$Game.getActiveGame(div);
            var myOpenBetTeam1 = (_a = _this.openBets) === null || _a === void 0 ? void 0 : _a.find(function (item) {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                var team1 = (_c = (_b = (_a = item.details) === null || _a === void 0 ? void 0 : _a.i) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.ht; // homeTeam
                var isHomeTeam = (_g = (_f = (_e = (_d = item.details) === null || _d === void 0 ? void 0 : _d.i) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.on) === null || _g === void 0 ? void 0 : _g.trim().toLowerCase().includes('home');
                return team1.toLowerCase().includes((_h = activeGame.team1Name) === null || _h === void 0 ? void 0 : _h.toLowerCase()) && isHomeTeam;
            });
            var myOpenBetTeam2 = (_b = _this.openBets) === null || _b === void 0 ? void 0 : _b.find(function (item) {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                var team2 = (_c = (_b = (_a = item.details) === null || _a === void 0 ? void 0 : _a.i) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.at; // awayTeam
                var isAwayTeam = (_g = (_f = (_e = (_d = item.details) === null || _d === void 0 ? void 0 : _d.i) === null || _e === void 0 ? void 0 : _e[0]) === null || _f === void 0 ? void 0 : _f.on) === null || _g === void 0 ? void 0 : _g.trim().toLowerCase().includes('away');
                return team2.toLowerCase().includes((_h = activeGame.team2Name) === null || _h === void 0 ? void 0 : _h.toLowerCase()) && isAwayTeam;
            });
            var myTeam1Status;
            var myTeam2Status;
            if (myOpenBetTeam1) {
                if (activeGame.team1Score - activeGame.team2Score > 0) {
                    myTeam1Status = "isWinning";
                }
                else {
                    myTeam1Status = "isLosing";
                }
            }
            if (myOpenBetTeam2) {
                if (activeGame.team2Score - activeGame.team1Score > 0) {
                    myTeam2Status = "isWinning";
                }
                else {
                    myTeam2Status = "isLosing";
                }
            }
            var sofaData = _this.gameListWithPrediction.find(function (x) {
                var _a, _b, _c, _d;
                return ((_a = x.team1Name) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === ((_b = activeGame.team1Name) === null || _b === void 0 ? void 0 : _b.toLowerCase()) ||
                    ((_c = x.team2Name) === null || _c === void 0 ? void 0 : _c.toLowerCase()) === ((_d = activeGame.team2Name) === null || _d === void 0 ? void 0 : _d.toLowerCase());
            });
            var sameGameBet = _this.$Game.checkSameGameBet(activeGame, [], _this.openBets);
            var betMode = _this.$Game.getBetMode(activeGame, [], _this.openBets);
            return __assign(__assign({}, activeGame), { myOpenBetData: {
                    myTeam1Status: myTeam1Status,
                    myTeam2Status: myTeam2Status,
                    myOpenBetTeam1: myOpenBetTeam1,
                    myOpenBetTeam2: myOpenBetTeam2,
                }, halfWinnings: sameGameBet.halfWinnings, sofaData: sofaData, betMode: betMode, sameGameBet: sameGameBet });
        });
        this.log({ MoneyLines: MoneyLines });
    };
    Utils.prototype.addEventListenerPostMessage = function () {
        var _this = this;
        document.addEventListener('message', function (e) { return __awaiter(_this, void 0, void 0, function () {
            var message, loginBtn, withdrawBtn, viewOk, ddScope_1, amScope_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        message = JSON.parse(e.data || null);
                        if (!(message && message.event === 'Login')) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.waitForSelector('#mk_top_Login', { timeout: 30000 })];
                    case 1:
                        loginBtn = _a.sent();
                        if (!loginBtn) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.waitClick(loginBtn)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 8];
                    case 4:
                        if (!(message && message.event === 'Withdrawal')) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.waitForSelectorByTxt('button', 'Withdraw', { timeout: 30000 })];
                    case 5:
                        withdrawBtn = _a.sent();
                        if (!withdrawBtn) return [3 /*break*/, 8];
                        return [4 /*yield*/, this.waitClick(withdrawBtn)];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.waitForSelector('.mwc-cashout-new-content', { timeout: 10000 })];
                    case 7:
                        viewOk = _a.sent();
                        if (viewOk) {
                            ddScope_1 = angular.element(document.querySelector('.mwc-dropdown-menu')).scope();
                            amScope_1 = angular.element(document.querySelector('.mwc-cashout-new-content')).scope();
                            ddScope_1.$apply(function () { return __awaiter(_this, void 0, void 0, function () {
                                var card, amountScope, emailScope, btnSubmit, i_1, inter, paymentSuccessful;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            card = ddScope_1.$ctrl.paymentMethods.find(function (item) { return item.ID === 'Interac E-Transfer'; });
                                            ddScope_1.$ctrl.changeCard(card);
                                            return [4 /*yield*/, this.delay(1000)];
                                        case 1:
                                            _a.sent();
                                            amountScope = angular.element(document.querySelector('#amount')).scope();
                                            amountScope.$ctrl.amount = 10;
                                            emailScope = angular.element(document.querySelector('#payment_interac_e_transfer_mail')).scope();
                                            emailScope.$ctrl.accountEmail = 'janbee@wealthsimple.me';
                                            emailScope.$ctrl.onModelChange();
                                            amScope_1.$$childTail.$$childTail.$ctrl.aknowledge = true;
                                            return [4 /*yield*/, this.waitForSelector('.mwc-cashout-new-request-submit-button')];
                                        case 2:
                                            btnSubmit = _a.sent();
                                            if (!btnSubmit) return [3 /*break*/, 7];
                                            return [4 /*yield*/, this.waitClick(btnSubmit)];
                                        case 3:
                                            _a.sent();
                                            return [4 /*yield*/, this.delay(1000)];
                                        case 4:
                                            _a.sent();
                                            return [4 /*yield*/, this.waitClick(btnSubmit)];
                                        case 5:
                                            _a.sent();
                                            i_1 = 120;
                                            inter = setInterval(function () {
                                                var aElem = document.querySelector('.mwc-one-time-passcode-controls a');
                                                i_1--;
                                                if (aElem) {
                                                    aElem.innerText = "You'll received 2 emails\\n enter the 2nd,\\n ".concat(i_1, " sec remaining...");
                                                }
                                            }, 1000);
                                            return [4 /*yield*/, this.waitForSelector('.mwc-cashout-content-success', {
                                                    timeout: 120000,
                                                })];
                                        case 6:
                                            paymentSuccessful = _a.sent();
                                            clearInterval(inter);
                                            if (paymentSuccessful) {
                                                this.log({ Payment: 'success' }); // <---- important log
                                            }
                                            else {
                                                this.log({ Payment: 'failed' }); // <---- important log
                                            }
                                            _a.label = 7;
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            }); });
                        }
                        _a.label = 8;
                    case 8: return [2 /*return*/];
                }
            });
        }); });
    };
    Utils.prototype.log = function (log) {
        var serverTime = JSON.parse(localStorage.getItem('NeoGames_128_SEVER_TIME') || 'null');
        electron_1.ipcRenderer.invoke('main-listener', __assign(__assign({}, log), { serverTime: serverTime })).finally();
    };
    Utils.prototype.reload = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.log({ Action: 'Reloading', Status: 'waiting...' });
                        window.location.href = "https://playalberta.ca/sports/live-now?t=".concat(new Date().getTime());
                        return [4 /*yield*/, this.delay(5000)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return Utils;
}());
exports.Utils = Utils;
var PlayAb = function ($window) { return __awaiter(void 0, void 0, void 0, function () {
    var utils, hasPromo, isLoggedIn, _a, weekStart, weekEnd, UserSession, savedSettledBets, _b, apiSettledBets, toSaved, _c, sBal;
    var _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                utils = new Utils($window, {
                    loopLimit: _loopLimit,
                    bet: _bet,
                    lowerBet: _lowerBet,
                    hasActiveWorker: _hasActiveWorker,
                    account: _account,
                    accounts: _accounts,
                    canLogin: _canLogin,
                });
                utils.addEventListenerPostMessage();
                return [4 /*yield*/, utils.loading()];
            case 1:
                _f.sent();
                return [4 /*yield*/, utils.hasPromo()];
            case 2:
                hasPromo = _f.sent();
                return [4 /*yield*/, utils.isLoggedIn()];
            case 3:
                isLoggedIn = _f.sent();
                if (!!isLoggedIn) return [3 /*break*/, 5];
                return [4 /*yield*/, utils.login()];
            case 4:
                _f.sent();
                return [3 /*break*/, 6];
            case 5:
                utils.getActiveAccount();
                _f.label = 6;
            case 6:
                if (!(isLoggedIn && hasPromo)) return [3 /*break*/, 12];
                _a = utils.getDates(), weekStart = _a.weekStart, weekEnd = _a.weekEnd;
                return [4 /*yield*/, utils.getUserData()];
            case 7:
                UserSession = _f.sent();
                return [4 /*yield*/, utils.autoCashoutProcess(UserSession)];
            case 8:
                _f.sent();
                /*const userArray = await utils.getReactApi({
                  name: 'GetUserDataMongo',
                  value: UserSession.Email,
                });*/
                utils.userSession = _userSession;
                if (utils.userSession &&
                    utils.userSession.data &&
                    utils.userSession.data.weekStatus &&
                    utils.userSession.data.weekStatus.startDate !== weekStart.toISOString()) {
                    utils.userSession.data.weekStatus.startDate = weekStart.toISOString();
                    utils.userSession.data.weekStatus.done = false;
                }
                utils.log({ UserSession: UserSession });
                savedSettledBets = utils.getWithExpiry('settledBets') || [];
                _b = utils;
                return [4 /*yield*/, utils.loopGetSettledBets(1, [])];
            case 9:
                _b.settledBets = _f.sent();
                utils.settledBets = (_d = utils.settledBets) === null || _d === void 0 ? void 0 : _d.filter(function (item) {
                    var _a, _b;
                    var status = (_b = (_a = item.details) === null || _a === void 0 ? void 0 : _a.i) === null || _b === void 0 ? void 0 : _b[0].s;
                    return !item.bty.includes('FreeBet') && ['Won', 'Lost'].includes(status);
                });
                apiSettledBets = utils.settledBets || [];
                if (apiSettledBets) {
                    toSaved = utils.uniqBy(__spreadArray(__spreadArray([], apiSettledBets, true), savedSettledBets, true), 'id');
                    utils.setWithExpiry('settledBets', toSaved, weekEnd.getTime());
                }
                _c = utils;
                return [4 /*yield*/, utils.loopGetOpenBets(1, [])];
            case 10:
                _c.openBets = _f.sent();
                utils.openBets = (_e = utils.openBets) === null || _e === void 0 ? void 0 : _e.filter(function (item) { var _a, _b; return !item.bty.includes('FreeBet') && ((_b = (_a = item.details) === null || _a === void 0 ? void 0 : _a.i) === null || _b === void 0 ? void 0 : _b[0].s) === 'Placed'; });
                /*
                 * same open and settled bet trigger
                 * */
                utils.log({ OpenBets: utils.openBets, SettledBets: utils.settledBets });
                if (!utils.openBets) {
                    utils.$user = undefined;
                }
                return [4 /*yield*/, utils.getMyCash()];
            case 11:
                sBal = (_f.sent()).sBal;
                utils.log({ MyCash: sBal, MyCashAfterBet: sBal });
                return [3 /*break*/, 13];
            case 12:
                utils.log({ UserSession: null, SettledBets: null, OpenBets: null, Bonuses: null });
                _f.label = 13;
            case 13: return [4 /*yield*/, utils.inProgressGameBot()];
            case 14:
                _f.sent();
                return [4 /*yield*/, utils.delay(5000)];
            case 15:
                _f.sent();
                return [4 /*yield*/, utils.reload()];
            case 16:
                _f.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.PlayAb = PlayAb;
var initPlayAbAPp = function () {
    electron_1.ipcRenderer.invoke('main-listener', { Action: 'Initializing PlayAb', Status: 'waiting...' }).finally();
    var tid = setInterval(function () {
        if (document.readyState !== 'complete')
            return;
        clearInterval(tid);
        // do your work
        electron_1.ipcRenderer.invoke('main-listener', { DOMReady: true }).finally();
    }, 100);
};
setTimeout(function () {
    electron_1.ipcRenderer.on('playAb-listener', function (event, _a) {
        var Action = _a.Action, data = _a.data;
        if (Action === 'reload') {
            window.location.reload();
        }
        if (Action === 'initPlayAb') {
            electron_1.ipcRenderer.invoke('main-listener', { Action: 'Initializing PlayAb', Status: 'ready!!!' }).finally();
            setTimeout(function () {
                var _a, _b, _c;
                _loopLimit = parseInt(((_a = data.data.settings) === null || _a === void 0 ? void 0 : _a.loopLimit) || 500, 10);
                _bet = parseInt(((_b = data.data.settings) === null || _b === void 0 ? void 0 : _b.bet) || 25, 10);
                _lowerBet = parseInt(((_c = data.data.settings) === null || _c === void 0 ? void 0 : _c.lowerBet) || 4, 10);
                _hasActiveWorker = false;
                _account = data.account;
                _userSession = data;
                _accounts = data.accounts;
                _canLogin = data.canLogin;
                (0, exports.PlayAb)(window).finally();
            }, 5000);
        }
    });
    initPlayAbAPp();
}, 300);
