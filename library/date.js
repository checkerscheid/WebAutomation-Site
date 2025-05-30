(function () {
	var root = this;
	var timezoneJS;
	if (typeof exports !== 'undefined') {
		timezoneJS = exports;
	} else {
		timezoneJS = root.timezoneJS = {};
	}
	timezoneJS.VERSION = '1.0.0';
	var $ = root.$ || root.jQuery || root.Zepto
		, fleegix = root.fleegix
		, DAYS = timezoneJS.Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
		, MONTHS = timezoneJS.Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
		, SHORT_MONTHS = {}
		, SHORT_DAYS = {}
		, EXACT_DATE_TIME = {}
		, TZ_REGEXP = new RegExp('^[a-zA-Z]+/');
	for (var i = 0; i < MONTHS.length; i++) {
		SHORT_MONTHS[MONTHS[i].substr(0, 3)] = i;
	}
	for (i = 0; i < DAYS.length; i++) {
		SHORT_DAYS[DAYS[i].substr(0, 3)] = i;
	}
	if (!Array.prototype.indexOf) {
		Array.prototype.indexOf = function (el) {
			for (var i = 0; i < this.length; i++ ) {
				if (el === this[i]) return i;
			}
			return -1;
		};
	}
	var _fixWidth = function (number, digits) {
		if (typeof number !== "number") { throw "not a number: " + number; }
		var s = number.toString();
		if (number.length > digits) {
			return number.substr(number.length - digits, number.length);
		}
		while (s.length < digits) {
			s = '0' + s;
		}
		return s;
	};
	var _transport = function (opts) {
		if ((!fleegix || typeof fleegix.xhr === 'undefined') && (!$ || typeof $.ajax === 'undefined')) {
			throw new Error('Please use the Fleegix.js XHR module, jQuery ajax, Zepto ajax, or define your own transport mechanism for downloading zone files.');
		}
		if (!opts) return;
		if (!opts.url) throw new Error ('URL must be specified');
		if (!('async' in opts)) opts.async = true;
		if (!opts.async) {
			return fleegix && fleegix.xhr
			? fleegix.xhr.doReq({ url: opts.url, async: false })
			: $.ajax({ url : opts.url, async : false }).responseText;
		}
		return fleegix && fleegix.xhr
		? fleegix.xhr.send({
			url : opts.url,
			method : 'get',
			handleSuccess : opts.success,
			handleErr : opts.error
		})
		: $.ajax({
			url : opts.url,
			dataType: 'text',
			method : 'GET',
			error : opts.error,
			success : opts.success
		});
	};
	timezoneJS.Date = function () {
		var args = Array.prototype.slice.apply(arguments)
		, dt = null
		, tz = null
		, arr = [];
		if (Object.prototype.toString.call(args[0]) === '[object Array]') {
			args = args[0];
		}
		if (typeof args[args.length - 1] === 'string' && TZ_REGEXP.test(args[args.length - 1])) {
			tz = args.pop();
		}
		switch (args.length) {
			case 0:
				dt = new Date();
				break;
			case 1:
				dt = new Date(args[0]);
				break;
			default:
				for (var i = 0; i < 7; i++) {
					arr[i] = args[i] || 0;
				}
				dt = new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5], arr[6]);
				break;
		}
		this._useCache = false;
		this._tzInfo = {};
		this._day = 0;
		this.year = 0;
		this.month = 0;
		this.date = 0;
		this.hours = 0;
		this.minutes = 0;
		this.seconds = 0;
		this.milliseconds = 0;
		this.timezone = tz || null;
		if (arr.length) {
			 this.setFromDateObjProxy(dt);
		} else {
			 this.setFromTimeProxy(dt.getTime(), tz);
		}
	};
	timezoneJS.Date.prototype = {
		getDate: function () { return this.date; },
		getDay: function () { return this._day; },
		getFullYear: function () { return this.year; },
		getMonth: function () { return this.month; },
		getYear: function () { return this.year; },
		getHours: function () { return this.hours; },
		getMilliseconds: function () { return this.milliseconds; },
		getMinutes: function () { return this.minutes; },
		getSeconds: function () { return this.seconds; },
		getUTCDate: function () { return this.getUTCDateProxy().getUTCDate(); },
		getUTCDay: function () { return this.getUTCDateProxy().getUTCDay(); },
		getUTCFullYear: function () { return this.getUTCDateProxy().getUTCFullYear(); },
		getUTCHours: function () { return this.getUTCDateProxy().getUTCHours(); },
		getUTCMilliseconds: function () { return this.getUTCDateProxy().getUTCMilliseconds(); },
		getUTCMinutes: function () { return this.getUTCDateProxy().getUTCMinutes(); },
		getUTCMonth: function () { return this.getUTCDateProxy().getUTCMonth(); },
		getUTCSeconds: function () { return this.getUTCDateProxy().getUTCSeconds(); },
		getTime: function () {
			return this._timeProxy + (this.getTimezoneOffset() * 60 * 1000);
		},
		getTimezone: function () { return this.timezone; },
		getTimezoneOffset: function () { return this.getTimezoneInfo().tzOffset; },
		getTimezoneAbbreviation: function () { return this.getTimezoneInfo().tzAbbr; },
		getTimezoneInfo: function () {
			if (this._useCache) return this._tzInfo;
			var res;
			if (this.timezone) {
				res = this.timezone === 'Etc/UTC' || this.timezone === 'Etc/GMT'
					? { tzOffset: 0, tzAbbr: 'UTC' }
					: timezoneJS.timezone.getTzInfo(this._timeProxy, this.timezone);
			}
			else {
				res = { tzOffset: this.getLocalOffset(), tzAbbr: null };
			}
			this._tzInfo = res;
			this._useCache = true;
			return res;
		},
		getUTCDateProxy: function () {
			var dt = new Date(this._timeProxy);
			dt.setUTCMinutes(dt.getUTCMinutes() + this.getTimezoneOffset());
			return dt;
		},
		setDate: function (n) { this.setAttribute('date', n); },
		setFullYear: function (n) { this.setAttribute('year', n); },
		setMonth: function (n) { this.setAttribute('month', n); },
		setYear: function (n) { this.setUTCAttribute('year', n); },
		setHours: function (n) { this.setAttribute('hours', n); },
		setMilliseconds: function (n) { this.setAttribute('milliseconds', n); },
		setMinutes: function (n) { this.setAttribute('minutes', n); },
		setSeconds: function (n) { this.setAttribute('seconds', n); },
		setTime: function (n) {
			if (isNaN(n)) { throw new Error('Units must be a number.'); }
			this.setFromTimeProxy(n, this.timezone);
		},
		setUTCDate: function (n) { this.setUTCAttribute('date', n); },
		setUTCFullYear: function (n) { this.setUTCAttribute('year', n); },
		setUTCHours: function (n) { this.setUTCAttribute('hours', n); },
		setUTCMilliseconds: function (n) { this.setUTCAttribute('milliseconds', n); },
		setUTCMinutes: function (n) { this.setUTCAttribute('minutes', n); },
		setUTCMonth: function (n) { this.setUTCAttribute('month', n); },
		setUTCSeconds: function (n) { this.setUTCAttribute('seconds', n); },
		setFromDateObjProxy: function (dt) {
			this.year = dt.getFullYear();
			this.month = dt.getMonth();
			this.date = dt.getDate();
			this.hours = dt.getHours();
			this.minutes = dt.getMinutes();
			this.seconds = dt.getSeconds();
			this.milliseconds = dt.getMilliseconds();
			this._day =	dt.getDay();
			this._dateProxy = dt;
			this._timeProxy = Date.UTC(this.year, this.month, this.date, this.hours, this.minutes, this.seconds, this.milliseconds);
			this._useCache = false;
		},
		setFromTimeProxy: function (utcMillis, tz) {
			var dt = new Date(utcMillis);
			var tzOffset;
			tzOffset = tz ? timezoneJS.timezone.getTzInfo(dt, tz).tzOffset : dt.getTimezoneOffset();
			dt.setTime(utcMillis + (dt.getTimezoneOffset() - tzOffset) * 60000);
			this.setFromDateObjProxy(dt);
		},
		setAttribute: function (unit, n) {
			if (isNaN(n)) { throw new Error('Units must be a number.'); }
			var dt = this._dateProxy;
			var meth = unit === 'year' ? 'FullYear' : unit.substr(0, 1).toUpperCase() + unit.substr(1);
			dt['set' + meth](n);
			this.setFromDateObjProxy(dt);
		},
		setUTCAttribute: function (unit, n) {
			if (isNaN(n)) { throw new Error('Units must be a number.'); }
			var meth = unit === 'year' ? 'FullYear' : unit.substr(0, 1).toUpperCase() + unit.substr(1);
			var dt = this.getUTCDateProxy();
			dt['setUTC' + meth](n);
			dt.setUTCMinutes(dt.getUTCMinutes() - this.getTimezoneOffset());
			this.setFromTimeProxy(dt.getTime() + this.getTimezoneOffset() * 60000, this.timezone);
		},
		setTimezone: function (tz) {
			var previousOffset = this.getTimezoneInfo().tzOffset;
			this.timezone = tz;
			this._useCache = false;
			this.setUTCMinutes(this.getUTCMinutes() - this.getTimezoneInfo().tzOffset + previousOffset);
		},
		removeTimezone: function () {
			this.timezone = null;
			this._useCache = false;
		},
		valueOf: function () { return this.getTime(); },
		clone: function () {
			return this.timezone ? new timezoneJS.Date(this.getTime(), this.timezone) : new timezoneJS.Date(this.getTime());
		},
		toGMTString: function () { return this.toString('EEE, dd MMM yyyy HH:mm:ss Z', 'Etc/GMT'); },
		toLocaleString: function () {},
		toLocaleDateString: function () {},
		toLocaleTimeString: function () {},
		toSource: function () {},
		toISOString: function () { return this.toString('yyyy-MM-ddTHH:mm:ss.SSS', 'Etc/UTC') + 'Z'; },
		toJSON: function () { return this.toISOString(); },
		toString: function (format, tz) {
			if (!format) format = 'yyyy-MM-dd HH:mm:ss';
			var result = format;
			var tzInfo = tz ? timezoneJS.timezone.getTzInfo(this.getTime(), tz) : this.getTimezoneInfo();
			var _this = this;
			if (tz) {
				_this = this.clone();
				_this.setTimezone(tz);
			}
			var hours = _this.getHours();
			return result
			.replace(/a+/g, function () { return 'k'; })
			.replace(/y+/g, function (token) { return _fixWidth(_this.getFullYear(), token.length); })
			.replace(/d+/g, function (token) { return _fixWidth(_this.getDate(), token.length); })
			.replace(/m+/g, function (token) { return _fixWidth(_this.getMinutes(), token.length); })
			.replace(/s+/g, function (token) { return _fixWidth(_this.getSeconds(), token.length); })
			.replace(/S+/g, function (token) { return _fixWidth(_this.getMilliseconds(), token.length); })
			.replace(/M+/g, function (token) {
				var _month = _this.getMonth(),
				_len = token.length;
				if (_len > 3) {
					return timezoneJS.Months[_month];
				} else if (_len > 2) {
					return timezoneJS.Months[_month].substring(0, _len);
				}
				return _fixWidth(_month + 1, _len);
			})
			.replace(/k+/g, function () {
				if (hours >= 12) {
					if (hours > 12) {
						hours -= 12;
					}
					return 'PM';
				}
				return 'AM';
			})
			.replace(/H+/g, function (token) { return _fixWidth(hours, token.length); })
			.replace(/E+/g, function (token) { return DAYS[_this.getDay()].substring(0, token.length); })
			.replace(/Z+/gi, function () { return tzInfo.tzAbbr; });
		},
		toUTCString: function () { return this.toGMTString(); },
		civilToJulianDayNumber: function (y, m, d) {
			var a;
			m++;
			if (m > 12) {
				a = parseInt(m/12, 10);
				m = m % 12;
				y += a;
			}
			if (m <= 2) {
				y -= 1;
				m += 12;
			}
			a = Math.floor(y / 100);
			var b = 2 - a + Math.floor(a / 4)
				, jDt = Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + b - 1524;
			return jDt;
		},
		getLocalOffset: function () {
			return this._dateProxy.getTimezoneOffset();
		}
	};
	timezoneJS.timezone = new function () {
		var _this = this
			, regionMap = {'Etc':'etcetera','EST':'northamerica','MST':'northamerica','HST':'northamerica','EST5EDT':'northamerica','CST6CDT':'northamerica','MST7MDT':'northamerica','PST8PDT':'northamerica','America':'northamerica','Pacific':'australasia','Atlantic':'europe','Africa':'africa','Indian':'africa','Antarctica':'antarctica','Asia':'asia','Australia':'australasia','Europe':'europe.txt','WET':'europe','CET':'europe','MET':'europe','EET':'europe'}
			, regionExceptions = {'Pacific/Honolulu':'northamerica','Atlantic/Bermuda':'northamerica','Atlantic/Cape_Verde':'africa','Atlantic/St_Helena':'africa','Indian/Kerguelen':'antarctica','Indian/Chagos':'asia','Indian/Maldives':'asia','Indian/Christmas':'australasia','Indian/Cocos':'australasia','America/Danmarkshavn':'europe','America/Scoresbysund':'europe','America/Godthab':'europe','America/Thule':'europe','Asia/Yekaterinburg':'europe','Asia/Omsk':'europe','Asia/Novosibirsk':'europe','Asia/Krasnoyarsk':'europe','Asia/Irkutsk':'europe','Asia/Yakutsk':'europe','Asia/Vladivostok':'europe','Asia/Sakhalin':'europe','Asia/Magadan':'europe','Asia/Kamchatka':'europe','Asia/Anadyr':'europe','Africa/Ceuta':'europe','America/Argentina/Buenos_Aires':'southamerica','America/Argentina/Cordoba':'southamerica','America/Argentina/Tucuman':'southamerica','America/Argentina/La_Rioja':'southamerica','America/Argentina/San_Juan':'southamerica','America/Argentina/Jujuy':'southamerica','America/Argentina/Catamarca':'southamerica','America/Argentina/Mendoza':'southamerica','America/Argentina/Rio_Gallegos':'southamerica','America/Argentina/Ushuaia':'southamerica','America/Aruba':'southamerica','America/La_Paz':'southamerica','America/Noronha':'southamerica','America/Belem':'southamerica','America/Fortaleza':'southamerica','America/Recife':'southamerica','America/Araguaina':'southamerica','America/Maceio':'southamerica','America/Bahia':'southamerica','America/Sao_Paulo':'southamerica','America/Campo_Grande':'southamerica','America/Cuiaba':'southamerica','America/Porto_Velho':'southamerica','America/Boa_Vista':'southamerica','America/Manaus':'southamerica','America/Eirunepe':'southamerica','America/Rio_Branco':'southamerica','America/Santiago':'southamerica','Pacific/Easter':'southamerica','America/Bogota':'southamerica','America/Curacao':'southamerica','America/Guayaquil':'southamerica','Pacific/Galapagos':'southamerica','Atlantic/Stanley':'southamerica','America/Cayenne':'southamerica','America/Guyana':'southamerica','America/Asuncion':'southamerica','America/Lima':'southamerica','Atlantic/South_Georgia':'southamerica','America/Paramaribo':'southamerica','America/Port_of_Spain':'southamerica','America/Montevideo':'southamerica','America/Caracas':'southamerica'};
		function invalidTZError(t) { throw new Error('Timezone "' + t + '" is either incorrect, or not loaded in the timezone registry.'); }
		function builtInLoadZoneFile(fileName, opts) {
			var url = _this.zoneFileBasePath + '/' + fileName;
			return !opts || !opts.async
			? _this.parseZones(_this.transport({ url : url, async : false }))
			: _this.transport({
				async: true,
				url : url,
				success : function (str) {
					if (_this.parseZones(str) && typeof opts.callback === 'function') {
						opts.callback();
					}
					return true;
				},
				error : function () {
					throw new Error('Error retrieving "' + url + '" zoneinfo files');
				}
			});
		}
		function getRegionForTimezone(tz) {
			var exc = regionExceptions[tz]
				, reg
				, ret;
			if (exc) return exc;
			reg = tz.split('/')[0];
			ret = regionMap[reg];
			if (ret) return ret;
			var link = _this.zones[tz];
			if (typeof link === 'string') {
				return getRegionForTimezone(link);
			}
			if (!_this.loadedZones.backward) {
				_this.loadZoneFile('backward');
				return getRegionForTimezone(tz);
			}
			invalidTZError(tz);
		}
		function parseTimeString(str) {
			var pat = /(\d+)(?::0*(\d*))?(?::0*(\d*))?([wsugz])?$/;
			var hms = str.match(pat);
			hms[1] = parseInt(hms[1], 10);
			hms[2] = hms[2] ? parseInt(hms[2], 10) : 0;
			hms[3] = hms[3] ? parseInt(hms[3], 10) : 0;
			return hms;
		}
		function processZone(z) {
			if (!z[3]) { return; }
			var yea = parseInt(z[3], 10);
			var mon = 11;
			var dat = 31;
			if (z[4]) {
				mon = SHORT_MONTHS[z[4].substr(0, 3)];
				dat = parseInt(z[5], 10) || 1;
			}
			var string = z[6] ? z[6] : '00:00:00'
				, t = parseTimeString(string);
			return [yea, mon, dat, t[1], t[2], t[3]];
		}
		function getZone(dt, tz) {
			var utcMillis = typeof dt === 'number' ? dt : new Date(dt).getTime();
			var t = tz;
			var zoneList = _this.zones[t];
			while (typeof zoneList === "string") {
				t = zoneList;
				zoneList = _this.zones[t];
			}
			if (!zoneList) {
				if (!_this.loadedZones.backward) {
					_this.loadZoneFile('backward');
					return getZone(dt, tz);
				}
				invalidTZError(t);
			}
			if (zoneList.length === 0) {
				throw new Error('No Zone found for "' + tz + '" on ' + dt);
			}
			for (var i = zoneList.length - 1; i >= 0; i--) {
				var z = zoneList[i];
				if (z[3] && utcMillis > z[3]) break;
			}
			return zoneList[i+1];
		}
		function getBasicOffset(time) {
			var off = parseTimeString(time)
				, adj = time.indexOf('-') === 0 ? -1 : 1;
			off = adj * (((off[1] * 60 + off[2]) * 60 + off[3]) * 1000);
			return off/60/1000;
		}
		function getRule(dt, zone, isUTC) {
			var date = typeof dt === 'number' ? new Date(dt) : dt;
			var ruleset = zone[1];
			var basicOffset = zone[0];
			var convertDateToUTC = function (date, type, rule) {
				var offset = 0;
				if (type === 'u' || type === 'g' || type === 'z') {
					offset = 0;
				} else if (type === 's') {
					offset = basicOffset;
				} else if (type === 'w' || !type) {
					offset = getAdjustedOffset(basicOffset, rule);
				} else {
					throw("unknown type " + type);
				}
				offset *= 60 * 1000;

				return new Date(date.getTime() + offset);
			};
			var convertRuleToExactDateAndTime = function (yearAndRule, prevRule) {
				var year = yearAndRule[0]
					, rule = yearAndRule[1];
				var hms = rule[5];
				var effectiveDate;

				if (!EXACT_DATE_TIME[year])
					EXACT_DATE_TIME[year] = {};
				if (EXACT_DATE_TIME[year][rule])
					effectiveDate = EXACT_DATE_TIME[year][rule];
				else {
					if (!isNaN(rule[4])) {
						effectiveDate = new Date(Date.UTC(year, SHORT_MONTHS[rule[3]], rule[4], hms[1], hms[2], hms[3], 0));
					}
					else {
						var targetDay
							, operator;
						if (rule[4].substr(0, 4) === "last") {
							effectiveDate = new Date(Date.UTC(year, SHORT_MONTHS[rule[3]] + 1, 1, hms[1] - 24, hms[2], hms[3], 0));
							targetDay = SHORT_DAYS[rule[4].substr(4, 3)];
							operator = "<=";
						}
						else {
							effectiveDate = new Date(Date.UTC(year, SHORT_MONTHS[rule[3]], rule[4].substr(5), hms[1], hms[2], hms[3], 0));
							targetDay = SHORT_DAYS[rule[4].substr(0, 3)];
							operator = rule[4].substr(3, 2);
						}
						var ourDay = effectiveDate.getUTCDay();
						if (operator === ">=") {
							effectiveDate.setUTCDate(effectiveDate.getUTCDate() + (targetDay - ourDay + ((targetDay < ourDay) ? 7 : 0)));
						}
						else {
							effectiveDate.setUTCDate(effectiveDate.getUTCDate() + (targetDay - ourDay - ((targetDay > ourDay) ? 7 : 0)));
						}
					}
					EXACT_DATE_TIME[year][rule] = effectiveDate;
				}
				if (prevRule) {
					effectiveDate = convertDateToUTC(effectiveDate, hms[4], prevRule);
				}
				return effectiveDate;
			};

			var findApplicableRules = function (year, ruleset) {
				var applicableRules = [];
				for (var i = 0; ruleset && i < ruleset.length; i++) {
					if (ruleset[i][0] <= year &&
							(
								ruleset[i][1] >= year ||
									(ruleset[i][0] === year && ruleset[i][1] === "only") ||
										ruleset[i][1] === "max"
					)
						 ) {
							 applicableRules.push([year, ruleset[i]]);
						 }
				}
				return applicableRules;
			};
			var compareDates = function (a, b, prev) {
				var year, rule;
				if (a.constructor !== Date) {
					year = a[0];
					rule = a[1];
					a = (!prev && EXACT_DATE_TIME[year] && EXACT_DATE_TIME[year][rule])
						? EXACT_DATE_TIME[year][rule]
						: convertRuleToExactDateAndTime(a, prev);
				} else if (prev) {
					a = convertDateToUTC(a, isUTC ? 'u' : 'w', prev);
				}
				if (b.constructor !== Date) {
					year = b[0];
					rule = b[1];
					b = (!prev && EXACT_DATE_TIME[year] && EXACT_DATE_TIME[year][rule]) ? EXACT_DATE_TIME[year][rule]
						: convertRuleToExactDateAndTime(b, prev);
				} else if (prev) {
					b = convertDateToUTC(b, isUTC ? 'u' : 'w', prev);
				}
				a = Number(a);
				b = Number(b);
				return a - b;
			};
			var year = date.getUTCFullYear();
			var applicableRules;
			applicableRules = findApplicableRules(year, _this.rules[ruleset]);
			applicableRules.push(date);
			applicableRules.sort(compareDates);
			if (applicableRules.indexOf(date) < 2) {
				applicableRules = applicableRules.concat(findApplicableRules(year-1, _this.rules[ruleset]));
				applicableRules.sort(compareDates);
			}
			var pinpoint = applicableRules.indexOf(date);
			if (pinpoint > 1 && compareDates(date, applicableRules[pinpoint-1], applicableRules[pinpoint-2][1]) < 0) {
				return applicableRules[pinpoint - 2][1];
			} else if (pinpoint > 0 && pinpoint < applicableRules.length - 1 && compareDates(date, applicableRules[pinpoint+1], applicableRules[pinpoint-1][1]) > 0) {
				return applicableRules[pinpoint + 1][1];
			} else if (pinpoint === 0) {
				return null;
			}
			return applicableRules[pinpoint - 1][1];
		}
		function getAdjustedOffset(off, rule) {
			return -Math.ceil(rule[6] - off);
		}
		function getAbbreviation(zone, rule) {
			var res;
			var base = zone[2];
			if (base.indexOf('%s') > -1) {
				var repl;
				if (rule) {
					repl = rule[7] === '-' ? '' : rule[7];
				}
				else {
					repl = 'S';
				}
				res = base.replace('%s', repl);
			}
			else if (base.indexOf('/') > -1) {
				res = base.split("/", 2)[rule[6] ? 1 : 0];
			} else {
				res = base;
			}
			return res;
		}
		this.zoneFileBasePath;
		this.zoneFiles = ['africa.txt', 'antarctica.txt', 'asia.txt', 'australasia.txt', 'backward.txt', 'etcetera.txt', 'europe.txt', 'northamerica.txt', 'pacificnew.txt', 'southamerica.txt'];
		this.loadingSchemes = {
			PRELOAD_ALL: 'preloadAll',
			LAZY_LOAD: 'lazyLoad',
			MANUAL_LOAD: 'manualLoad'
		};
		this.loadingScheme = this.loadingSchemes.LAZY_LOAD;
		this.loadedZones = {};
		this.zones = {};
		this.rules = {};
		this.init = function (o) {
			var opts = { async: true }
				, def = this.defaultZoneFile = this.loadingScheme === this.loadingSchemes.PRELOAD_ALL
					? this.zoneFiles
					: 'europe.txt'
				, done = 0
				, callbackFn;
			for (var p in o) {
				opts[p] = o[p];
			}
			if (typeof def === 'string') {
				return this.loadZoneFile(def, opts);
			}
			callbackFn = opts.callback;
			opts.callback = function () {
				done++;
				(done === def.length) && typeof callbackFn === 'function' && callbackFn();
			};
			for (var i = 0; i < def.length; i++) {
				this.loadZoneFile(def[i], opts);
			}
		};
		this.loadZoneFile = function (fileName, opts) {
			if (typeof this.zoneFileBasePath === 'undefined') {
				throw new Error('Please define a base path to your zone file directory -- timezoneJS.timezone.zoneFileBasePath.');
			}
			if (this.loadedZones[fileName]) {
				return;
			}
			this.loadedZones[fileName] = true;
			return builtInLoadZoneFile(fileName, opts);
		};
		this.loadZoneJSONData = function (url, sync) {
			var processData = function (data) {
				data = eval('('+ data +')');
				for (var z in data.zones) {
					_this.zones[z] = data.zones[z];
				}
				for (var r in data.rules) {
					_this.rules[r] = data.rules[r];
				}
			};
			return sync
			? processData(_this.transport({ url : url, async : false }))
			: _this.transport({ url : url, success : processData });
		};
		this.loadZoneDataFromObject = function (data) {
			if (!data) { return; }
			for (var z in data.zones) {
				_this.zones[z] = data.zones[z];
			}
			for (var r in data.rules) {
				_this.rules[r] = data.rules[r];
			}
		};
		this.getAllZones = function () {
			var arr = [];
			for (var z in this.zones) { arr.push(z); }
			return arr.sort();
		};
		this.parseZones = function (str) {
			var lines = str.split('\n')
				, arr = []
				, chunk = ''
				, l
				, zone = null
				, rule = null;
			for (var i = 0; i < lines.length; i++) {
				l = lines[i];
				if (l.match(/^\s/)) {
					l = "Zone " + zone + l;
				}
				l = l.split("#")[0];
				if (l.length > 3) {
					arr = l.split(/\s+/);
					chunk = arr.shift();
					switch (chunk) {
						case 'Zone':
							zone = arr.shift();
							if (!_this.zones[zone]) {
								_this.zones[zone] = [];
							}
							if (arr.length < 3) break;
							arr.splice(3, arr.length, processZone(arr));
							if (arr[3]) arr[3] = Date.UTC.apply(null, arr[3]);
							arr[0] = -getBasicOffset(arr[0]);
							_this.zones[zone].push(arr);
							break;
						case 'Rule':
							rule = arr.shift();
							if (!_this.rules[rule]) {
								_this.rules[rule] = [];
							}
							arr[0] = parseInt(arr[0], 10);
							arr[1] = parseInt(arr[1], 10) || arr[1];
							arr[5] = parseTimeString(arr[5]);
							arr[6] = getBasicOffset(arr[6]);
							_this.rules[rule].push(arr);
							break;
						case 'Link':
							if (_this.zones[arr[1]]) {
								throw new Error('Error with Link ' + arr[1] + '. Cannot create link of a preexisted zone.');
							}
							_this.zones[arr[1]] = arr[0];
							break;
					}
				}
			}
			return true;
		};
		this.transport = _transport;
		this.getTzInfo = function (dt, tz, isUTC) {
			if (this.loadingScheme === this.loadingSchemes.LAZY_LOAD) {
				var zoneFile = getRegionForTimezone(tz);
				if (!zoneFile) {
					throw new Error('Not a valid timezone ID.');
				}
				if (!this.loadedZones[zoneFile]) {
					this.loadZoneFile(zoneFile);
				}
			}
			var z = getZone(dt, tz);
			var off = z[0];
			var rule = getRule(dt, z, isUTC);
			if (rule) {
				off = getAdjustedOffset(off, rule);
			}
			var abbr = getAbbreviation(z, rule);
			return { tzOffset: off, tzAbbr: abbr };
		};
	};
}).call(this);
