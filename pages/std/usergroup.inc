<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 12.03.2013                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 550                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: usergroup.inc 550 2023-12-25 03:02:54Z                   $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query('
	SELECT [ug].[id_usergroup], [ug].[name], [ug].[order], [ug].[static], ISNULL([ut].[usercount], 0) AS [usercount], ISNULL([wpt].[pagecount], 0) AS [pagecount]
	FROM [usergroup] [ug]
	LEFT JOIN
	(
		SELECT [id_usergroup], COUNT([id_user]) AS [usercount]
		FROM [user]
		GROUP BY [id_usergroup]
	) AS [ut] ON [ug].[id_usergroup] = [ut].[id_usergroup]
	LEFT JOIN
	(
		SELECT [usergroupread], COUNT([id_webpages]) AS [pagecount]
		FROM [webpages]
		GROUP BY [usergroupread]
	) AS [wpt] ON [ug].[id_usergroup] = [wpt].[usergroupread]
	ORDER BY [ug].[static], [ug].[order]');

?>

<div id="usergroup">
	<h1>Sicherheitsgruppen</h1>
<?
	$tempStatic = '';
	while($erg = $database->fetch()) {
		if($erg['static'] != $tempStatic) {
			echo '<hr />';
			$tempStatic = $erg['static'];
		}
		if($_SESSION[SESSION_ID]['LEVEL'] >= $erg['order']) {
?>
	<div>
		<h3<?=($erg['static'] == 0 ? ' data-groupid="'.$erg['id_usergroup'].'"' : '')?>><?=$erg['name']?></h3>
		<p>editierbar: <?=($erg['static'] == 0 ? 'ja' : 'nein')?></p>
		<p>Sicherheitslevel: <?=$erg['order']?></p>
		<p>Enthaltene Benutzer: <?=$erg['usercount']?></p>
		<p>Enthaltene Seiten: <?=$erg['pagecount']?></p>
	</div>
<?
		}
	}
?>
</div>
