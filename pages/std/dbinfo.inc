<?
//###################################################################################
//#                                                                                 #
//#              (C) FreakaZone GmbH                                                #
//#              =======================                                            #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 11.12.2019                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 636                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: dbinfo.inc 636 2024-07-04 14:28:56Z                      $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
$database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = 'dbinfo'");
$headline = $database->fetch();

$database->query("SELECT
	[t].[name] AS [TableName], [p].[rows] AS [RowCounts],
	SUM([a].[total_pages]) * 8 AS [TotalSpaceKB], SUM([a].[used_pages]) * 8 AS [UsedSpaceKB],
	(SUM([a].[total_pages]) - SUM([a].[used_pages])) * 8 AS [UnusedSpaceKB]
FROM [sys].[tables] [t]
INNER JOIN [sys].[indexes] [i] ON [t].[object_id] = [i].[object_id]
INNER JOIN [sys].[partitions] [p] ON [i].[object_id] = [p].[object_id] AND [i].[index_id] = [p].[index_id]
INNER JOIN [sys].[allocation_units] [a] ON [p].[partition_id] = [a].[container_id]
LEFT OUTER JOIN [sys].[schemas] [s] ON [t].[schema_id] = [s].[schema_id]
WHERE [t].[name] NOT LIKE 'dt%' AND [t].[is_ms_shipped] = 0 AND [i].[object_id] > 255
GROUP BY [t].[name], [s].[name], [p].[rows]
ORDER BY [TotalSpaceKB] DESC");
?>
<div id="dbinfo">
	<h1><?=$headline['name']?></h1>
	<table summary="" id="tabledbinfo" class="stripe hover">
		<thead>
			<tr>
				<th>Tabellenname</th>
				<th>Anzahl Zeilen</th>
				<th>Größe</th>
				<th>benutzter Speicher</th>
				<th>unbenutzter Speicher</th>
			</tr>
		</thead>
		<tbody>
<?
while($erg = $database->fetch()) {
?>
			<tr>
				<td><?=$erg['TableName'] ?></td>
				<td><?=$erg['RowCounts'] ?></td>
				<td><?=$erg['TotalSpaceKB'] ?></td>
				<td><?=$erg['UsedSpaceKB'] ?></td>
				<td><?=$erg['UnusedSpaceKB'] ?></td>
			</tr>
<?
}
?>

		</tbody>
	</table>
	<div>
		<span class="ps-button startHistoryCleaner">Start HistoryCleaner</span>
	</div>
</div>
