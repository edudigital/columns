<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Atto text editor integration version file.
 *
 * @package    atto_columns
 * @copyright  EDUdigital
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();


/**
 * Initialise this plugin
 * @param string $elementid
 */
function atto_columns_strings_for_js() {
    global $PAGE;

    $PAGE->requires->strings_for_js(array('insert',
                                          'cancel',
                                          'enteroption',
                                          'dialogtitle'),
                                    'atto_columns');
}

/**
 * Return the js params required for this module.
 * @return array of additional params to pass to javascript init function for this module.
 */
function atto_columns_params_for_js($elementid, $options, $fpoptions) {
	global $USER, $COURSE;
	//coursecontext
	$coursecontext=context_course::instance($COURSE->id);	
	
	//usercontextid
	$usercontextid=context_user::instance($USER->id)->id;
	$disabled=false;
	
	//config our array of data
	$params = array();
	$params['usercontextid'] = $usercontextid;
  
        //add our disabled param
        $params['disabled'] = $disabled;
        
		//Column structure for the four types
		//Column typeone - 50% 50%
		//Column typetwo - 66% 33%
		//Column typethree - 33% 66%
		//Column typefour - 33% 33% 33%
	
		$params['typeone'] = '<div class="layout-2-cols layout-2-50-50 col-clear">
							<div class="col-50-50 col-1">
								<p>Lorem ipsum dolor sit amet...</p>
							</div>
							<div class="col-50-50 col-2">
								<p>Lorem ipsum dolor sit amet...</p>
							</div>
						</div>';
		$params['typetwo'] = '<div class="layout-2-cols layout-2-66-33 col-clear">
								<div class="col-66-33 col-1">
									<p>Lorem ipsum dolor sit amet...</p>
								</div>
								<div class="col-66-33 col-2">
									<p>Lorem ipsum dolor sit amet...</p>
								</div>
							</div>';
		$params['typethree'] = '<div class="layout-2-cols layout-2-33-66 col-clear">
							<div class="col-33-66 col-1">
								<p>Lorem ipsum dolor sit amet...</p>
							</div>
							<div class="col-33-66 col-2">
								<p>Lorem ipsum dolor sit amet...</p>
							</div>
							</div>';
		$params['typefour'] = '<div class="layout-3-cols layout-2-33-33-33 col-clear">
								<div class="col-33-33-33 col-1">
									<p>Lorem ipsum dolor sit amet...</p>
								</div>
								<div class="col-33-33-33 col-2">
									<p>Lorem ipsum dolor sit amet...</p>
								</div>
								<div class="col-33-33-33 col-3">
									<p>Lorem ipsum dolor sit amet...</p>
								</div>
								</div>';

    return $params;

}


