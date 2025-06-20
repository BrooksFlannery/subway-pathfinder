import { TrainLine } from "@/lib/types/types"

const oneLine: TrainLine = {
    id: 'train-1',
    name: '1 Train to South Ferry Whitehall St.',
    trains: [],
    line: ['station-561', 'station-559', 'station-560', 'station-558', 'station-553', 'station-554', 'station-555', 'station-556', 'station-557', 'station-552', 'station-812', 'station-817', 'station-813', 'station-814', 'station-815', 'station-816', 'station-96', 'station-809', 'station-811', 'station-807', 'station-119', 'station-149', 'station-382', 'station-113', 'station-404', 'station-402', 'station-347', 'station-346', 'station-341', 'station-401', 'station-398', 'station-399', 'station-400', 'station-147', 'station-330', 'station-269']
}
const twoLine: TrainLine = {
    id: 'train-2',
    name: '2 Train to Flatbush Av.',
    trains: [],
    line: ['station-842', 'station-832', 'station-834', 'station-836', 'station-838', 'station-923', 'station-920', 'station-921', 'station-922', 'station-919', 'station-840', 'station-828', 'station-830', 'station-824', 'station-822', 'station-820', 'station-818', 'station-284', 'station-826', 'station-282', 'station-782', 'station-781', 'station-780', 'station-779', 'station-810', 'station-808', 'station-114', 'station-403', 'station-340', 'station-148', 'station-270', 'station-331', 'station-328', 'station-930', 'station-198', 'station-195', 'station-196', 'station-169', 'station-178', 'station-179', 'station-180', 'station-393', 'station-612', 'station-616', 'station-618', 'station-620', 'station-622', 'station-624', 'station-614']
}
const threeLine: TrainLine = {
    id: 'train-3',
    name: '3 Train to East NY New Lots Av.',
    trains: [],
    line: ['station-783', 'station-784', 'station-782', 'station-781', 'station-780', 'station-779', 'station-810', 'station-808', 'station-114', 'station-403', 'station-340', 'station-148', 'station-270', 'station-331', 'station-328', 'station-930', 'station-198', 'station-195', 'station-196', 'station-169', 'station-178', 'station-179', 'station-180', 'station-393', 'station-625', 'station-626', 'station-627', 'station-628', 'station-629', 'station-630', 'station-631', 'station-632', 'station-633', 'station-634']
}

const fourLine: TrainLine = {
    id: 'train-4',
    name: '4 Train to Crown Heights Utica Av.',
    trains: [],
    line: ['station-857', 'station-851', 'station-852', 'station-853', 'station-854', 'station-855', 'station-858', 'station-856', 'station-850', 'station-849', 'station-848', 'station-388', 'station-385', 'station-280', 'station-543', 'station-545', 'station-376', 'station-318', 'station-322', 'station-339', 'station-334', 'station-329', 'station-324', 'station-204', 'station-197', 'station-170', 'station-392', 'station-1750230970192']
}
//nereid av is missing 5 stops from bronx pk east to gunhill rd
const fiveLineNereidAv: TrainLine = {
    id: 'train-5',
    name: '5 Train from Nereid to Flatbush Av. Brooklyn College',
    trains: [],
    line: ['station-833', 'station-835', 'station-837', 'station-839', 'station-841', 'station-829', 'station-831', 'station-825', 'station-823', 'station-821', 'station-819', 'station-285', 'station-827', 'station-283', 'station-281', 'station-543', 'station-545', 'station-376', 'station-318', 'station-322', 'station-339', 'station-334', 'station-329', 'station-324', 'station-204', 'station-197', 'station-170', 'station-392', 'station-611', 'station-615', 'station-617', 'station-619', 'station-621', 'station-623', 'station-623', 'station-613']
}
const fiveLineEastChesterDyreAv: TrainLine = {
    id: 'train-6',
    name: '5 Train from EastChesterDyreAve to Flatbush Av.',
    trains: [],
    line: ['station-847', 'station-844', 'station-845', 'station-846', 'station-843', 'station-841', 'station-829', 'station-831', 'station-825', 'station-823', 'station-821', 'station-819', 'station-285', 'station-827', 'station-283', 'station-281', 'station-543', 'station-545', 'station-376', 'station-318', 'station-322', 'station-339', 'station-334', 'station-329', 'station-324', 'station-204', 'station-197', 'station-170', 'station-392', 'station-611', 'station-615', 'station-617', 'station-619', 'station-621', 'station-623', 'station-623', 'station-613']
}

const sixLine: TrainLine = {
    id: 'train-7',
    name: '6 Train to Brooklyn Bridge',
    trains: [],
    line: ['station-874', 'station-883', 'station-1750236137800', 'station-880', 'station-878', 'station-876', 'station-868', 'station-872', 'station-871', 'station-870', 'station-869', 'station-863', 'station-865', 'station-866', 'station-864', 'station-861', 'station-860', 'station-859', 'station-544', 'station-542', 'station-541', 'station-540', 'station-539', 'station-546', 'station-538', 'station-537', 'station-377', 'station-375', 'station-319', 'station-352', 'station-351', 'station-350', 'station-323', 'station-413', 'station-410', 'station-415', 'station-265', 'station-338']
}
const sixExpressLine: TrainLine = {
    id: 'train-8',
    name: '6 Train Express to Brooklyn Bridge',
    trains: [],
    line: ['station-873', 'station-882', 'station-881', 'station-879', 'station-877', 'station-875', 'station-867', 'station-862', 'station-859', 'station-544', 'station-542', 'station-541', 'station-540', 'station-539', 'station-546', 'station-538', 'station-537', 'station-377', 'station-375', 'station-319', 'station-352', 'station-351', 'station-350', 'station-323', 'station-413', 'station-410', 'station-415', 'station-265', 'station-338']
}
const sevenLine: TrainLine = {
    id: 'train-9',
    name: '7 Train to Times Sq.',
    trains: [],
    line: ['station-317', 'station-312', 'station-315', 'station-306', 'station-314', 'station-313', 'station-220', 'station-310', 'station-304', 'station-309', 'station-307', 'station-308', 'station-302', 'station-301', 'station-379', 'station-771', 'station-521', 'station-321', 'station-286', 'station-117']
}
const sevenExpressLine: TrainLine = {
    id: 'train-10',
    name: '7 Train Express to Times Sq.',
    trains: [],
    line: ['station-316', 'station-311', 'station-305', 'station-303', 'station-301', 'station-379', 'station-771', 'station-521', 'station-321', 'station-286', 'station-117']
}
const aTrain: TrainLine = {
    id: 'train-11',
    name: 'A Train to Ozone Park',
    trains: [],
    line: ['station-551', 'station-550', 'station-549', 'station-548', 'station-547', 'station-129', 'station-126', 'station-103', 'station-150', 'station-259', 'station-406', 'station-275', 'station-194', 'station-397', 'station-396', 'station-272', 'station-332', 'station-130', 'station-185', 'station-190', 'station-708', 'station-710', 'station-648', 'station-723', 'station-727', 'station-728', 'station-729', 'station-730', 'station-731', 'station-732', 'station-733']
}
const aTrainFarRockawayMottAv: TrainLine = {
    id: 'train-12',
    name: 'A Train to Far Rockaway Mott Av.',
    trains: [],
    line: ['station-551', 'station-550', 'station-549', 'station-548', 'station-547', 'station-129', 'station-126', 'station-103', 'station-150', 'station-259', 'station-406', 'station-275', 'station-194', 'station-397', 'station-396', 'station-272', 'station-332', 'station-130', 'station-185', 'station-190', 'station-708', 'station-710', 'station-648', 'station-723', 'station-727', 'station-728', 'station-729', 'station-730', 'station-744', 'station-931', 'station-434', 'station-206', 'station-210', 'station-209', 'station-208', 'station-207', 'station-211']
}
const aTrainRockawayParkBeach: TrainLine = {
    id: 'train-13',
    name: 'A Train to Rockaway Park Beach',
    trains: [],
    line: ['station-551', 'station-550', 'station-549', 'station-548', 'station-547', 'station-129', 'station-126', 'station-103', 'station-150', 'station-259', 'station-406', 'station-275', 'station-194', 'station-397', 'station-396', 'station-272', 'station-332', 'station-130', 'station-185', 'station-190', 'station-708', 'station-710', 'station-648', 'station-723', 'station-727', 'station-728', 'station-729', 'station-730', 'station-744', 'station-931', 'station-434', 'station-436', 'station-438', 'station-440', 'station-442']
}
const RockawayParkShuttle: TrainLine = {
    id: 'train-14',
    name: 'Rockaway Park Shuttle',
    trains: [],
    line: ['station-435', 'station-437', 'station-439', 'station-441', 'station-443']
}
const JFKAirtrainHowardBeach: TrainLine = {
    id: 'train-15',
    name: 'JFK Airtrain From Howard Beach',
    trains: [],
    line: ['station-932', 'station-364', 'station-365', 'station-366', 'station-367', 'station-368', 'station-371', 'station-370', 'station-369']
}
const JFKAirtrainSutphinBlvd: TrainLine = {
    id: 'train-16',
    name: 'JFK AirTrain From Sutphin Blvd',
    trains: [],
    line: ['station-932', 'station-365', 'station-366', 'station-367', 'station-368', 'station-371', 'station-370', 'station-369', 'station-652', 'station-364', 'station-365', 'station-366', 'station-367', 'station-368', 'station-371', 'station-370', 'station-369']
}
const bTrain: TrainLine = {
    id: 'train-17',
    name: 'B Train to Brighton Beach',
    trains: [],
    line: ['station-604', 'station-598', 'station-562', 'station-568', 'station-574', 'station-580', 'station-586', 'station-592', 'station-387', 'station-155', 'station-120', 'station-158', 'station-97', 'station-535', 'station-533', 'station-531', 'station-529', 'station-527', 'station-525', 'station-523', 'station-151', 'station-292', 'station-383', 'station-290', 'station-82', 'station-80', 'station-193', 'station-409', 'station-414', 'station-137', 'station-171', 'station-177', 'station-490', 'station-246', 'station-500', 'station-511', 'station-7', 'station-253']
}
const cTrain: TrainLine = {
    id: 'train-18',
    name: 'C Train to Euclid Av.',
    trains: [],
    line: ['station-128', 'station-157', 'station-156', 'station-127', 'station-163', 'station-104', 'station-536', 'station-534', 'station-532', 'station-530', 'station-528', 'station-526', 'station-524', 'station-152', 'station-381', 'station-260', 'station-405', 'station-349', 'station-276', 'station-191', 'station-395', 'station-271', 'station-333', 'station-1750229112180', 'station-187', 'station-188', 'station-720', 'station-721', 'station-389', 'station-707', 'station-711', 'station-709', 'station-712', 'station-713', 'station-649', 'station-725', 'station-724', 'station-726', 'station-722']
}
const dTrain: TrainLine = {
    id: 'train-19',
    name: 'D Train to Coney Is.',
    trains: [],
    line: ['station-610', 'station-609', 'station-603', 'station-567', 'station-573', 'station-579', 'station-585', 'station-591', 'station-597', 'station-386', 'station-154', 'station-125', 'station-102', 'station-153', 'station-292', 'station-383', 'station-290', 'station-82', 'station-80', 'station-193', 'station-409', 'station-414', 'station-146', 'station-474', 'station-456', 'station-466', 'station-465', 'station-464', 'station-463', 'station-458', 'station-457', 'station-459', 'station-450', 'station-1750237103328', 'station-1750237189162', 'station-1750237202447', 'station-449']
}
const eTrain: TrainLine = {
    id: 'train-20',
    name: 'E Train to WTC',
    trains: [],
    line: ['station-761', 'station-654', 'station-245', 'station-735', 'station-739', 'station-734', 'station-244', 'station-219', 'station-221', 'station-336', 'station-374', 'station-288', 'station-293', 'station-381', 'station-260', 'station-405', 'station-349', 'station-276', 'station-191', 'station-395', 'station-273']
}
const fTrain: TrainLine = {
    id: 'train-21',
    name: 'F Train to Coney Is.',
    trains: [],
    line: ['station-742', 'station-743', 'station-741', 'station-740', 'station-737', 'station-738', 'station-736', 'station-240', 'station-215', 'station-772', 'station-380', 'station-295', 'station-294', 'station-384', 'station-291', 'station-81', 'station-348', 'station-79', 'station-192', 'station-408', 'station-278', 'station-279', 'station-407', 'station-929', 'station-186', 'station-417', 'station-419', 'station-420', 'station-422', 'station-426', 'station-428', 'station-430', 'station-432', 'station-512', 'station-515', 'station-514', 'station-513', 'station-517', 'station-516', 'station-518', 'station-519', 'station-520', 'station-1750239900592', 'station-445', 'station-446']
}
const gTrain: TrainLine = {
    id: 'train-22',
    name: 'G Train to Kensington Church Av.',
    trains: [],
    line: ['station-242', 'station-238', 'station-235', 'station-232', 'station-229', 'station-226', 'station-217', 'station-645', 'station-639', 'station-642', 'station-636', 'station-213', 'station-223', 'station-254', 'station-522', 'station-764', 'station-763', 'station-701', 'station-762', 'station-765', 'station-766', 'station-767', 'station-768', 'station-769', 'station-770', 'station-189', 'station-416', 'station-418', 'station-421', 'station-423', 'station-427', 'station-429', 'station-431', 'station-433']
}
const jTrain: TrainLine = {
    id: 'train-23',
    name: 'J Train to Broad St.',
    trains: [],
    line: ['station-759', 'station-651', 'station-676', 'station-683', 'station-674', 'station-687', 'station-672', 'station-682', 'station-670', 'station-685', 'station-668', 'station-678', 'station-666', 'station-677', 'station-650', 'station-661', 'station-662', 'station-658', 'station-659', 'station-681', 'station-656', 'station-74', 'station-655', 'station-754', 'station-755', 'station-756', 'station-928', 'station-758', 'station-750', 'station-749']
}
const lTrain: TrainLine = {
    id: 'train-24',
    name: 'L Train to Canarsie Rockaway Pkwy',
    trains: [],
    line: ['station-274', 'station-78', 'station-8', 'station-353', 'station-354', 'station-688', 'station-700', 'station-689', 'station-690', 'station-691', 'station-692', 'station-693', 'station-694', 'station-702', 'station-695', 'station-698', 'station-699', 'station-412', 'station-714', 'station-716', 'station-715', 'station-717', 'station-718', 'station-719']
}
const mTrain: TrainLine = {
    id: 'train-25',
    name: 'M Train to Bensonhurst Bay Pkwy',
    trains: [],
    line: ['station-748', 'station-746', 'station-747', 'station-745', 'station-703', 'station-696', 'station-697', 'station-680', 'station-706', 'station-705', 'station-704', 'station-753', 'station-752', 'station-751', 'station-927', 'station-757', 'station-786', 'station-785', 'station-205', 'station-83', 'station-138', 'station-139', 'station-663', 'station-424', 'station-483', 'station-481', 'station-467', 'station-451', 'station-1750237322073', 'station-1750237306789', 'station-1750237297143', 'station-1750237286238', 'station-1750237277043', 'station-1750237265898', 'station-1750237254452', 'station-1750237222432', 'station-1750237092018']
}
const nTrain: TrainLine = {
    id: 'train-26',
    name: 'N Train to Coney Is.',
    trains: [],
    line: ['station-778', 'station-774', 'station-775', 'station-776', 'station-777', 'station-773', 'station-300', 'station-378', 'station-289', 'station-261', 'station-263', 'station-115', 'station-361', 'station-257', 'station-255', 'station-76', 'station-296', 'station-298', 'station-266', 'station-145', 'station-473', 'station-476', 'station-478', 'station-477', 'station-462', 'station-460', 'station-461', 'station-1750243505686', 'station-1750243490015', 'station-1750244070236', 'station-1750243469164', 'station-447']
}
const qTrain: TrainLine = {
    id: 'train-27',
    name: 'Q Train to Coney Is.',
    trains: [],
    line: ['station-262', 'station-116', 'station-363', 'station-75', 'station-266', 'station-136', 'station-164', 'station-172', 'station-485', 'station-492', 'station-247', 'station-493', 'station-494', 'station-495', 'station-503', 'station-502', 'station-501', 'station-506', 'station-505', 'station-504', 'station-2', 'station-248', 'station-1750253458792', 'station-444', 'station-448']
}
const rTrain: TrainLine = {
    id: 'train-28',
    name: 'R Train to Bay Ridge 23rd St.',
    trains: [],
    line: ['station-243', 'station-239', 'station-236', 'station-233', 'station-230', 'station-227', 'station-218', 'station-646', 'station-640', 'station-643', 'station-635', 'station-212', 'station-224', 'station-378', 'station-289', 'station-261', 'station-263', 'station-115', 'station-362', 'station-258', 'station-256', 'station-77', 'station-297', 'station-299', 'station-264', 'station-337', 'station-327', 'station-372', 'station-267', 'station-203', 'station-84', 'station-131', 'station-144', 'station-664', 'station-425', 'station-484', 'station-482', 'station-472', 'station-480', 'station-479', 'station-475', 'station-1750236629909', 'station-1750236588240', 'station-1750236605533', 'station-1750236574366']
}
const wTrain: TrainLine = {
    id: 'train-29',
    name: 'W Train to South Ferry Whitehall St.',
    trains: [],
    line: ['station-778', 'station-774', 'station-775', 'station-776', 'station-777', 'station-773', 'station-300', 'station-378', 'station-289', 'station-261', 'station-263', 'station-115', 'station-362', 'station-258', 'station-256', 'station-77', 'station-297', 'station-299', 'station-264', 'station-337', 'station-327', 'station-372', 'station-268']
}
const zTrain: TrainLine = {
    id: 'train-30',
    name: 'Z Train to Broad St.',
    trains: [],
    line: ['station-760', 'station-653', 'station-675', 'station-673', 'station-686', 'station-671', 'station-669', 'station-684', 'station-667', 'station-665', 'station-647', 'station-660', 'station-657', 'station-679', 'station-754', 'station-755', 'station-756', 'station-928', 'station-758', 'station-750', 'station-749']
}
const statenIslandRailway: TrainLine = {
    id: 'train-31',
    name: 'Staten Island Railway to St. George',
    trains: [],
    line: ['station-760', 'station-653', 'station-675', 'station-673', 'station-686', 'station-671', 'station-669', 'station-684', 'station-667', 'station-665', 'station-647', 'station-660', 'station-657', 'station-679', 'station-754', 'station-755', 'station-756', 'station-928', 'station-758', 'station-750', 'station-749']
}

//these should play be different rules
const statenIslandFerry: TrainLine = {
    id: 'train-32',
    name: 'Staten Island Ferry',
    trains: [],
    line: ['station-926', 'station-925']
}
const fortySecondStreetShuttle: TrainLine = {
    id: 'train-33',
    name: 'Forty Second Street Shuttle',
    trains: [],
    line: ['station-320', 'station-118']
}
const franklinShuttle: TrainLine = {
    id: 'train-34',
    name: 'Franklin Shuttle',
    trains: [],
    line: ['station-390', 'station-394', 'station-391', 'station-491']
}

export const allTrains = [oneLine, twoLine, threeLine, fourLine, fiveLineEastChesterDyreAv, fiveLineNereidAv, sixLine, sixExpressLine, sevenLine, sevenExpressLine, aTrain, aTrainFarRockawayMottAv, aTrainRockawayParkBeach, bTrain, cTrain, dTrain, eTrain, fTrain, gTrain, jTrain, lTrain, mTrain, nTrain, qTrain, rTrain, wTrain, zTrain, statenIslandRailway, JFKAirtrainHowardBeach, JFKAirtrainSutphinBlvd, statenIslandFerry, fortySecondStreetShuttle, franklinShuttle, RockawayParkShuttle]
