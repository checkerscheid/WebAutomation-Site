<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 19.10.2023                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 552                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: decode.inc 552 2024-01-06 13:56:24Z                      $ #
//#                                                                                 #
//###################################################################################
namespace pages\std;
class decode {
	//altes $t;
	const s = 'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNldGV0dXIgc2FkaXBzY2luZyBlbGl0ciwgc2VkIGRpYW0gbm9udW15IGVpcm1vZCB0ZW1wb3IgaW52aWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdXlhbSBlcmF0LCBzZWQgZGlhbSB2b2x1cHR1YS4gQXQgdmVybyBlb3MgZXQgYWNjdXNhbSBldCBqdXN0byBkdW8gZG9sb3JlcyBldCBlYSByZWJ1bS4gU3RldCBjbGl0YSBrYXNkIGd1YmVyZ3Jlbiwgbm8gc2VhIHRha2ltYXRhIHNhbmN0dXMgZXN0IExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LiBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2V0ZXR1ciBzYWRpcHNjaW5nIGVsaXRyLCBzZWQgZGlhbSBub251bXkgZWlybW9kIHRlbXBvciBpbnZpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1eWFtIGVyYXQsIHNlZCBkaWFtIHZvbHVwdHVhLiBBdCB2ZXJvIGVvcyBldCBhY2N1c2FtIGV0IGp1c3RvIGR1byBkb2xvcmVzIGV0IGVhIHJlYnVtLiBTdGV0IGNsaXRhIGthc2QgZ3ViZXJncmVuLCBubyBzZWEgdGFraW1hdGEgc2FuY3R1cyBlc3QgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQu';
	public static function decode($t) {
		return strrev(base64_decode($t));
	}
	public static function encode($c) {
		return base64_encode(strrev($c));
	}
	public static function line($c) {
		return '\'' . self::s . '\';$t=\'' . self::encode($c) . '\';eval(strrev(base64_decode($t)));\'' . self::s . '\';';
	}
}
?>
<div id="page">
	<h1><? \system\html::getPageHeadline();?></h1>
	<div class="center">
<?

$t='fQoNfQkKDTt0dW8kIG5ydXRlcgkJCg19CQkKDTsrK25vaXRpc29wPi1zaWh0JAkJCQoNfQkJCQoNO2thZXJiCQkJCQkKDX0JCQkJCQoNO3JhaGMkID0uIGV1bGF2JAkJCQkJCQoNeyApZXVsYXZzaTo6ZmxlcyA9PSB3b25fc2kkKGZpIGVzbGUgfQkJCQkJCg07cmFoYyQgPS4geWVrJAkJCQkJCQoNeyApeWVrc2k6OmZsZXMgPT0gd29uX3NpJChmaQkJCQkJCg06dGx1YWZlZAkJCQkKDTtrYWVyYgkJCQkJCg07Z25pcnRzc2k+LXNpaHQkISA9IGduaXJ0c3NpPi1zaWh0JAkJCQkJCg06JyInIGVzYWMJCQkJCg07a2FlcmIJCQkJCQoNfQkJCQkJCg07aHNpbmlmOjpmbGVzID0gd29uX3NpJAkJCQkJCQoNOycnID0gZXVsYXYkCQkJCQkJCg07JycgPSB5ZWskCQkJCQkJCg07ZXVsYXYkID0gXXllayRbdHVvJAkJCQkJCQoNfQkJCQkJCQoNOzIga2FlcmIJCQkJCQkJCg17ICloc2luaWY6OmZsZXMgPT0gd29uX3NpJChmaQkJCQkJCQoNeyBlc2xlIH0JCQkJCQoNO3JhaGMkID0uIGV1bGF2JAkJCQkJCQoNeyApZ25pcnRzc2k+LXNpaHQkICYmIGV1bGF2c2k6OmZsZXMgPT0gd29uX3NpJChmaSBlc2xlIH0JCQkJCQoNO3JhaGMkID0uIHllayQJCQkJCQkKDXsgKWduaXJ0c3NpPi1zaWh0JCAmJiB5ZWtzaTo6ZmxlcyA9PSB3b25fc2kkKGZpCQkJCQkKDTonfScgZXNhYwkJCQkKDTtrYWVyYgkJCQkJCg19CQkJCQkKDTtldWxhdnNpOjpmbGVzID0gd29uX3NpJAkJCQkJCQoNeyBlc2xlIH0JCQkJCQoNO3JhaGMkID0uIGV1bGF2JAkJCQkJCQoNeyApZ25pcnRzc2k+LXNpaHQkICYmIGV1bGF2c2k6OmZsZXMgPT0gd29uX3NpJChmaSBlc2xlIH0JCQkJCQoNO3JhaGMkID0uIHllayQJCQkJCQkKDXsgKWduaXJ0c3NpPi1zaWh0JCAmJiB5ZWtzaTo6ZmxlcyA9PSB3b25fc2kkKGZpCQkJCQkKDTonPScgZXNhYwkJCQkKDTtrYWVyYgkJCQkJCg19CQkJCQkKDTt5ZWtzaTo6ZmxlcyA9IHdvbl9zaSQJCQkJCQkKDXsgZXNsZSB9CQkJCQkKDTtoc2luaWY6OmZsZXMgPSB3b25fc2kkCQkJCQkJCg07JycgPSB5ZWskCQkJCQkJCg07bm9pdGlzb3A+LXNpaHQkID0gaSQJCQkJCQkKDTspKHlhcnJBdGVnPi1zaWh0JCA9IF15ZWskW3R1byQJCQkJCQkKDXsgKWV1bGF2c2k6OmZsZXMgPT0gd29uX3NpJChmaSBlc2xlIH0JCQkJCQoNO3JhaGMkID0uIGV1bGF2JAkJCQkJCQoNeyApZ25pcnRzc2k+LXNpaHQkICYmIGV1bGF2c2k6OmZsZXMgPT0gd29uX3NpJChmaSBlc2xlIH0JCQkJCQoNO3JhaGMkID0uIHllayQJCQkJCQkKDXsgKWduaXJ0c3NpPi1zaWh0JCAmJiB5ZWtzaTo6ZmxlcyA9PSB3b25fc2kkKGZpCQkJCQkKDToneycgZXNhYwkJCQkKDXsgKXJhaGMkKGhjdGl3cwkJCQoNO11ub2l0aXNvcD4tc2lodCRbdHhldF9hPi1zaWh0JCA9IHJhaGMkCQkJCg17ICkrK2kkIDspdHhldF9hPi1zaWh0JCh0bnVvYzxpJCA7bm9pdGlzb3A+LXNpaHQkPWkkKHJvZgkJCg07eWVrc2k6OmZsZXMgPSB3b25fc2kkCQkKDTsnJyA9IGV1bGF2JAkJCg07JycgPSB5ZWskCQkKDTspKHlhcnJhID0gdHVvJAkJCg17ICkoeWFyckF0ZWcgbm9pdGNudWYgY2lsYnVwCQoNLyogCQoNeWFycmEgbnJ1dGVyQCAqIAkKDXRyb3d0bkEgUENUIGVpZCB0aUIgcrzDZiB0aUIgdGxlc3O8w2xoY3N0bmUgKiAJCg0qKi8JCg19CQoNO2VzbGFmID0gZ25pcnRzc2k+LXNpaHQkCQkKDTspdHhldCQodGlscHNfcnRzID0gdHhldF9hPi1zaWh0JAkJCg07MCA9IG5vaXRpc29wPi1zaWh0JAkJCg17ICl0eGV0JCh0Y3VydHNub2NfXyBub2l0Y251ZiBjaWxidXAJCg0vKiAJCg10eGV0JCBnbmlydHMgbWFyYXBAICogCQoNKiAJCg0qKi8JCg07dHhldF9hJCBldGF2aXJwCQoNO25vaXRpc29wJCBldGF2aXJwCQoNO2VzbGFmID0gZ25pcnRzc2kkIGV0YXZpcnAJCg07MiA9IGV1bGF2c2kgdHNub2MJCg07MSA9IHlla3NpIHRzbm9jCQoNOzAgPSBoc2luaWYgdHNub2MJCg17IGVkb2NuZVBDVCBzc2FsYwoNLyogCg1uZXRyb3d0bkEgUENUIHJlZCBuZXJlaWRvY2VkIG11eiBlc3NhbEsgKiAKDSoqLwoNfQoNfQkKDTtzbnJ1dGVyJCBucnV0ZXIJCQoNfQkJCg07dHVvJCA9LiBzbnJ1dGVyJAkJCQoNeyApKTQyMDEgLHRla2Nvcz4tc2lodCQoZGFlcl90ZWtjb3NAID0gdHVvJCggZWxpaHcJCQoNOykpbGhlZmViJChuZWxydHMgLGxoZWZlYiQgLHRla2Nvcz4tc2lodCQoZXRpcndfdGVrY29zQAkJCg07JycgPSBzbnJ1dGVyJAkJCg19CQkKDTsnPicubWFyYXAkLic8JyA9LiBsaGVmZWIkICknJyA9ISBtYXJhcCQoZmkJCQkKDTsnfScubGhlZmViJC4neycgPSBsaGVmZWIkCQkJCg17IGVzbGUgfQkJCg07J2RlbmlmZWRudScgPSBsaGVmZWIkCQkJCg17ICknJyA9PSBsaGVmZWIkKGZpCQkKDXsgKScnID0gbWFyYXAkICxsaGVmZWIkKGRuZXMgbm9pdGNudWYgY2lsYnVwCQoNLyogCQoNZ25pcnRzIG5ydXRlckAgKiAJCg10eGV0JCBnbmlydHMgbWFyYXBAICogCQoNKiovCQoNfQkKDTspdGVrY29zPi1zaWh0JChlc29sY190ZWtjb3MJCQoNeyApKHRjdXJ0c2VkX18gbm9pdGNudWYgY2lsYnVwCQoNCg19CQoNfQkJCg19CQkJCg07Im5cIi4nPi8gcmI8Jy4pKXRla2Nvcz4tc2lodCQocm9ycmVfdHNhbF90ZWtjb3Mocm9ycmVydHNfdGVrY29zLicgKScudGx1c2VyJC4nKCA6ZG51ckcgOm5lZ2FsaGNzZWdsaGVmICkodGNlbm5vY190ZWtjb3MnIG9oY2UJCQkJCg17ICl0bHVzZXIkISggZmkJCQkKDTspdHJvcF9TQyQ6OnRpbklQICxyZXZyZXNfU0MkOjp0aW5JUCAsdGVrY29zPi1zaWh0JCh0Y2Vubm9jX3Rla2Nvc0AgPSB0bHVzZXIkCQkJCg17IGVzbGUgfQkJCg07Im5cIi4nPi8gcmI8Jy4pKShyb3JyZV90c2FsX3Rla2Nvcyhyb3JyZXJ0c190ZWtjb3MuJyA6ZG51ckcgOm5lZ2FsaGNzZWdsaGVmICkoZXRhZXJjX3Rla2Nvcycgb2hjZQkJCQoNeyApdGVrY29zPi1zaWh0JCEoIGZpCQkKDTspKTAgPj0gJ2Nlc3UnICx0dW9lbWl0JCA+PSAnY2VzJyh5YXJyYSAsT0VNSVRWQ1JfT1MgLFRFS0NPU19MT1MgLHRla2Nvcz4tc2lodCQobm9pdHBvX3Rlc190ZWtjb3MJCQoNOylQQ1RfTE9TICxNQUVSVFNfS0NPUyAsVEVOSV9GQShldGFlcmNfdGVrY29zQCA9IHRla2Nvcz4tc2lodCQJCQoNeyApMSA9IHR1b2VtaXQkKHRjdXJ0c25vY19fIG5vaXRjbnVmIGNpbGJ1cAkKDQoNO2VzbGFmID0gcmVsaGVmJCBldGF2aXJwCQoNO3Rla2NvcyQgZXRhdmlycAkKDXsgbW9DYmVXIHNzYWxj';
//eval(strrev(base64_decode($t)));
$e = strrev(base64_decode($t));
//salt
'TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNldGV0dXIgc2FkaXBzY2luZyBlbGl0ciwgc2VkIGRpYW0gbm9udW15IGVpcm1vZCB0ZW1wb3IgaW52aWR1bnQgdXQgbGFib3JlIGV0IGRvbG9yZSBtYWduYSBhbGlxdXlhbSBlcmF0LCBzZWQgZGlhbSB2b2x1cHR1YS4gQXQgdmVybyBlb3MgZXQgYWNjdXNhbSBldCBqdXN0byBkdW8gZG9sb3JlcyBldCBlYSByZWJ1bS4gU3RldCBjbGl0YSBrYXNkIGd1YmVyZ3Jlbiwgbm8gc2VhIHRha2ltYXRhIHNhbmN0dXMgZXN0IExvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LiBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2V0ZXR1ciBzYWRpcHNjaW5nIGVsaXRyLCBzZWQgZGlhbSBub251bXkgZWlybW9kIHRlbXBvciBpbnZpZHVudCB1dCBsYWJvcmUgZXQgZG9sb3JlIG1hZ25hIGFsaXF1eWFtIGVyYXQsIHNlZCBkaWFtIHZvbHVwdHVhLiBBdCB2ZXJvIGVvcyBldCBhY2N1c2FtIGV0IGp1c3RvIGR1byBkb2xvcmVzIGV0IGVhIHJlYnVtLiBTdGV0IGNsaXRhIGthc2QgZ3ViZXJncmVuLCBubyBzZWEgdGFraW1hdGEgc2FuY3R1cyBlc3QgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQu';

print_r($e);
?>
	</div>
</div>
