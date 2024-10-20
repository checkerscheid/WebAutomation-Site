<?
//###################################################################################
//#                                                                                 #
//#                (C) FreakaZone GmbH                                              #
//#                =======================                                          #
//#                                                                                 #
//###################################################################################
//#                                                                                 #
//# Author       : Christian Scheid                                                 #
//# Date         : 20.10.2024                                                       #
//#                                                                                 #
//# Revision     : $Rev:: 705                                                     $ #
//# Author       : $Author::                                                      $ #
//# File-ID      : $Id:: trendview.inc 705 2024-10-20 17:29:42Z                   $ #
//#                                                                                 #
//###################################################################################
/** @var wpDatabase $database */
namespace pages\std;
use system\std;
use system\Helper\wpDatabase;

class trendview {
	const TYPETREND = 1;
	const TYPEGROUP = 2;
	private $headline;
	private $database;
	private $id;
	private $trendtype;
	private $pageinfo;
	private $name;
	private $forJS;
	public function __construct($pagename) {
		$this->database = new wpDatabase();
		$this->database->query("SELECT TOP 1 [name] FROM [webpages] WHERE [src] = '" . $pagename . "'");
		$this->headline = $this->database->fetch();

		$this->id = std::gets('param1');
		$this->trendType = std::gets('param2') == '1' ? self::TYPETREND : self::TYPEGROUP; // == 1 - point, != 1 - group

		if($this->id == '') {
			$this->pageinfo = '<h3 class="ps-fontred">Dieser Trend wurde gelöscht oder die Konfiguration exisiert nicht</h3>';
		} else {
			if($this->trendType == self::TYPETREND) {
				$this->pageinfo =  '<span>Loaded Trend id: ' . $this->id . '</span>';
			} else {
				$this->pageinfo =  '<span>Loaded Trendgroup id: ' . $this->id . '</span>';
			}
		}
	}
	public function isValid() {
		$returns = false;
		switch($this->trendType) {
			case self::TYPETREND:
				$returns = $this->getTrend();
				break;
			case self::TYPEGROUP:
				$returns = $this->getGroup();
				break;
		}
		return $returns;
	}
	public function getHeadline() {
		return $this->headline['name'];
	}
	public function getPageinfo() {
		return $this->pageinfo;
	}
	public function getJS() {
		return $this->forJS;
	}
	public function getName() {
		return $this->name;
	}
	private function getTrend() {
		$returns = false;
		$this->database->query('SELECT [name] FROM [trend] WHERE [id_trend] = ' . $this->id);
		$tinfo = $this->database->fetch();
		if($this->database->hasRows() > 0) {
			$this->name = $tinfo['name'];
			$this->forJS = '<ul class="GroupHeadLine ps-hidden" ' .
				'data-time="last24Hours" data-from="" data-to="" ' .
				'data-day="" data-choosen="timerange" ' .
				'data-useminmax="frompoint" data-only1axes="False">' .
				'<li>' . $this->id . '</li>' .
				'</ul';
			$returns = true;
		}
		return $returns;
	}
	private function getGroup() {
		$returns = false;
		$this->database->query("SELECT
			[name], [time], [timefrom], [timeto], [timeday], [choosentime], [useminmax], [only1axes]
			FROM [trendcfg] [tc]
			WHERE [tc].[id_trendcfg] = " . $this->id);
		$tinfo = $this->database->fetch();
		if($this->database->hasRows() > 0) {
			$this->name = $tinfo['name'];
			$tinfo['timefrom'] = self::getDateTimeFromDB($tinfo['timefrom']);
			$tinfo['timeto'] = self::getDateTimeFromDB($tinfo['timeto']);
			$tinfo['timeday'] = self::getDateTimeFromDB($tinfo['timeday']);
			$tinfo['only1axes'] = $tinfo['only1axes'] == '1' ? 'True' : 'False';
			$this->forJS = '<ul class="GroupHeadLine ps-hidden" ' .
				'data-time="' . $tinfo['time'] . '" data-from="' . $tinfo['timefrom'] . '" data-to="' . $tinfo['timeto'] . '" ' .
				'data-day="' . $tinfo['timeday'] . '" data-choosen="' . $tinfo['choosentime'] . '" ' .
				'data-useminmax="' . $tinfo['useminmax'] . '" data-only1axes="' . $tinfo['only1axes'] . '">';
			$this->database->query('SELECT [id_trend] FROM [trendcfgtrend] WHERE [id_trendcfg] = ' . $this->id);
			while($trends = $this->database->fetch()) {
				$this->forJS .= '<li>' . $trends['id_trend'] . '</li>';
			}
			$this->forJS .= '</ul>';
			$returns = true;
		}
		return $returns;
	}
	private static function getDateTimeFromDB($DateTime) {
		if(is_object($DateTime) && get_class($DateTime) == 'DateTime') {
			return strtotime($DateTime->format('Y-m-d'));
		} else {
			return '';
		}
	}
}
$tv = new trendview('trendview');


?>
<div id="trendview" class="page">
	<h1><?=$tv->getHeadline()?></h1>
<? if($tv->isValid()) { ?>
	<h3><?=$tv->getName() ?></h3>
	<span class="ps-button inactive zoomout">Zoom entfernen</span>
	<span class="ps-button trendshow">Neu laden</span>
	<span class="ps-button autoloadtrenddata">Automatisch Neuladen <span class="autoloadtrenddataseconds"></span></span>
	<div class="ps-container">
		<div id="TrendviewContainer" class="ps-loading">
		</div>
	</div>
	<div id="trendlegendcontainer" class="ps-container">
		<span class="selectedtime"><?=wpHTML_EMPTY ?></span>
		<div id="trendlegend">
		</div>
	</div>
	<?=$tv->getJS() ?>
<? } ?>
	<div><?=$tv->getPageinfo()?></div>
</div>
