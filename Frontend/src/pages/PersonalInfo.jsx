import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../services/api";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";

import AppTheme from "../AppTheme";

// Province data
const provinces = [
  "กรุงเทพมหานคร",
  "กระบี่",
  "กาญจนบุรี",
  "กาฬสินธุ์",
  "กำแพงเพชร",
  "ขอนแก่น",
  "จันทบุรี",
  "ฉะเชิงเทรา",
  "ชลบุรี",
  "ชัยนาท",
  "ชัยภูมิ",
  "ชุมพร",
  "เชียงราย",
  "เชียงใหม่",
  "ตรัง",
  "ตราด",
  "ตาก",
  "นครนายก",
  "นครปฐม",
  "นครพนม",
  "นครราชสีมา",
  "นครศรีธรรมราช",
  "นครสวรรค์",
  "นนทบุรี",
  "นราธิวาส",
  "น่าน",
  "บึงกาฬ",
  "บุรีรัมย์",
  "ปทุมธานี",
  "ประจวบคีรีขันธ์",
  "ปราจีนบุรี",
  "ปัตตานี",
  "พระนครศรีอยุธยา",
  "พะเยา",
  "พังงา",
  "พัทลุง",
  "พิจิตร",
  "พิษณุโลก",
  "เพชรบุรี",
  "เพชรบูรณ์",
  "แพร่",
  "ภูเก็ต",
  "มหาสารคาม",
  "มุกดาหาร",
  "แม่ฮ่องสอน",
  "ยโสธร",
  "ยะลา",
  "ร้อยเอ็ด",
  "ระนอง",
  "ระยอง",
  "ราชบุรี",
  "ลพบุรี",
  "ลำปาง",
  "ลำพูน",
  "เลย",
  "ศรีสะเกษ",
  "สกลนคร",
  "สงขลา",
  "สตูล",
  "สมุทรปราการ",
  "สมุทรสงคราม",
  "สมุทรสาคร",
  "สระแก้ว",
  "สระบุรี",
  "สิงห์บุรี",
  "สุโขทัย",
  "สุพรรณบุรี",
  "สุราษฎร์ธานี",
  "สุรินทร์",
  "หนองคาย",
  "หนองบัวลำภู",
  "อ่างทอง",
  "อำนาจเจริญ",
  "อุดรธานี",
  "อุตรดิตถ์",
  "อุทัยธานี",
  "อุบลราชธานี",
];

// University data by province
const universitiesByProvince = {
  กระบี่: ["มหาวิทยาลัยการกีฬาแห่งชาติ วิทยาเขตกระบี่"],
  กรุงเทพมหานคร: [
    "จุฬาลงกรณ์มหาวิทยาลัย",
    "มหาวิทยาลัยเกษตรศาสตร์",
    "มหาวิทยาลัยเกษตรศาสตร์ บางเขน",
    "มหาวิทยาลัยธรรมศาสตร์",
    "มหาวิทยาลัยมหิดล",
    "มหาวิทยาลัยรามคำแหง",
    "มหาวิทยาลัยรามคำแหง วิทยาเขตบางนา",
    "มหาวิทยาลัยศิลปากร",
    "มหาวิทยาลัยศรีนครินทรวิโรฒ",
    "สถาบันบัณฑิตพัฒนบริหารศาสตร์",
    "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี",
    "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี วิทยาเขตบางขุนเทียน",
    "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ",
    "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง",
    "มหาวิทยาลัยศรีปทุม",
    "มหาวิทยาลัยหอการค้าไทย",
    "มหาวิทยาลัยเกริก",
    "มหาวิทยาลัยเซนต์จอห์น",
    "มหาวิทยาลัยเทคโนโลยีมหานคร",
    "มหาวิทยาลัยอัสสัมชัญ",
    "มหาวิทยาลัยธนบุรี",
    "มหาวิทยาลัยธุรกิจบัณฑิตย์",
    "มหาวิทยาลัยเอเชียอาคเนย์",
    "มหาวิทยาลัยกรุงเทพธนบุรี",
    "วิทยาลัยเซนต์หลุยส์",
    "มหาวิทยาลัยเซาธ์อีสท์บางกอก",
    "วิทยาลัยดุสิตธานี",
    "วิทยาลัยทองสุข",
    "มหาวิทยาลัยนอร์ทกรุงเทพ",
    "มหาวิทยาลัยนานาชาติเอเชีย-แปซิฟิก วิทยาเขตกรุงเทพฯ",
    "สถาบันรัชต์ภาคย์",
    "มหาวิทยาลัยรัตนบัณฑิต",
    "มหาวิทยาลัยราชภัฏธนบุรี",
    "มหาวิทยาลัยราชภัฏพระนคร",
    "มหาวิทยาลัยสวนดุสิต",
    "มหาวิทยาลัยราชภัฏสวนสุนันทา",
    "มหาวิทยาลัยราชภัฏบ้านสมเด็จเจ้าพระยา",
    "มหาวิทยาลัยราชภัฏจันทรเกษม",
    "มหาวิทยาลัยเกษมบัณฑิต",
    "มหาวิทยาลัยเกษมบัณฑิต พัฒนาการ",
    "มหาวิทยาลัยสยาม",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสมทบ",
    "มหาวิทยาลัยมหามกุฏราชวิทยาลัย",
    "สถาบันเทคโนโลยีปทุมวัน",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลกรุงเทพ",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลกรุงเทพ วิทยาเขตเทคนิคกรุงเทพฯ",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลกรุงเทพ วิทยาเขตบพิตรพิมุข มหาเมฆ",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลกรุงเทพ วิทยาเขตพระนครใต้",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลตะวันออก วิทยาเขตจักรพงษภูนารถ",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลตะวันออก วิทยาเขตอุเทนถวาย",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลพระนคร",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลพระนคร ศูนย์เทเวศร์",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลพระนคร ศูนย์โชติเวช",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลพระนคร ศูนย์พณิชยการพระนคร",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลพระนคร ศูนย์พระนครเหนือ",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลรัตนโกสินทร์",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลรัตนโกสินทร์ วิทยาเขตเพาะช่าง",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลรัตนโกสินทร์ วิทยาเขตบพิตรพิมุข จักรวรรดิ",
    "สถาบันวิทยาลัยชุมชน",
    "โรงเรียนนายเรืออากาศนวมินทกษัตริยาธิราช",
    "วิทยาลัยแพทยศาสตร์พระมงกุฎเกล้า",
    "วิทยาลัยพยาบาลกองทัพบก",
    "วิทยาลัยพยาบาลกองทัพเรือ",
    "วิทยาลัยพยาบาลทหารอากาศ",
    "วิทยาลัยพยาบาลตำรวจ",
    "สถาบันพระบรมราชชนก",
    "วิทยาลัยพยาบาลบรมราชชนนี กรุงเทพ",
    "วิทยาลัยพยาบาลบรมราชชนนี นพรัตน์วชิระ",
    "สถาบันการพยาบาลศรีสวรินทิราสภากาชาดไทย",
    "สถาบันบัณฑิตพัฒนศิลป์",
    "มหาวิทยาลัยการกีฬาแห่งชาติ วิทยาเขตกรุงเทพ",
    "สถาบันการบินพลเรือน",
    "มหาวิทยาลัยกรุงเทพสุวรรณภูมิ",
    "วิทยาลัยเทคโนโลยีสยาม",
    "ราชวิทยาลัยจุฬาภรณ์",
    "สถาบันเทคโนโลยีไทย-ญี่ปุ่น",
    "สถาบันอาศรมศิลป์",
    "สถาบันบัณฑิตศึกษาจุฬาภรณ์",
    "สถาบันการจัดการปัญญาภิวัฒน์",
    "สถาบันดนตรีกัลยาณิวัฒนา",
    "มหาวิทยาลัยนวมินทราธิราช",
    "สถาบันเทคโนโลยีจิตรลดา",
    "โรงเรียนเสนาธิการทหารบก",
    "วิทยาลัยนานาชาติราฟเฟิลส์",
  ],
  กาญจนบุรี: [
    "มหาวิทยาลัยมหิดล วิทยาเขตกาญจนบุรี",
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดกาญจนบุรี",
    "มหาวิทยาลัยเวสเทิร์น",
    "มหาวิทยาลัยเวสเทิร์น กาญจนบุรี",
    "มหาวิทยาลัยราชภัฏกาญจนบุรี",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์กาญจนบุรี ศรีไพบูลย์",
  ],
  กาฬสินธุ์: [
    "มหาวิทยาลัยกาฬสินธุ์",
    "มหาวิทยาลัยมหามกุฏราชวิทยาลัย วิทยาลัยศาสนศาสตร์เฉลิมพระเกียรติกาฬสินธุ์",
  ],
  กำแพงเพชร: [
    "มหาวิทยาลัยราชภัฏกำแพงเพชร",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์กำแพงเพชร",
  ],
  ขอนแก่น: [
    "มหาวิทยาลัยขอนแก่น",
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดขอนแก่น",
    "มหาวิทยาลัยศรีปทุม วิทยาเขตขอนแก่น",
    "มหาวิทยาลัยภาคตะวันออกเฉียงเหนือ",
    "วิทยาลัยบัณฑิตเอเชีย",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาเขตขอนแก่น",
    "มหาวิทยาลัยมหามกุฏราชวิทยาลัย วิทยาเขตศรีล้านช้าง",
    "มหาวิทยาลัยมหามกุฏราชวิทยาลัย วิทยาเขตอีสาน",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตขอนแก่น",
    "วิทยาลัยพยาบาลบรมราชชนนี ขอนแก่น",
    "วิทยาลัยการสาธารณสุขสิรินธร ขอนแก่น",
  ],
  จันทบุรี: [
    "มหาวิทยาลัยสุโขทัยธรรมาธิราช (ศูนย์วิทยบริการและชุมชนสัมพันธ์ มสธ. จันทบุรี)",
    "มหาวิทยาลัยบูรพา วิทยาเขตสารสนเทศจันทบุรี",
    "มหาวิทยาลัยราชภัฏรำไพพรรณี",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์จันทบุรี",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลตะวันออก วิทยาเขตจันทบุรี",
    "วิทยาลัยพยาบาลพระปกเกล้า จันทบุรี",
  ],
  ฉะเชิงเทรา: [
    "มหาวิทยาลัยราชภัฏราชนครินทร์",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์พุทธโสธร ฉะเชิงเทรา",
    "มหาวิทยาลัยเฉลิมกาญจนา ฉะเชิงเทรา",
  ],
  ชลบุรี: [
    "มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา",
    "มหาวิทยาลัยธรรมศาสตร์ ศูนยถาวร-อุษา ประภา(ศูนย์พัทยา)",
    "สถาบันบัณฑิตพัฒนบริหารศาสตร์ วิทยาเขตชลบุรี",
    "มหาวิทยาลัยบูรพา",
    "มหาวิทยาลัยศรีปทุม วิทยาเขตชลบุรี",
    "วิทยาลัยดุสิตธานี ศูนย์การศึกษาเมืองพัทยา",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์ชลบุรี",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลตะวันออก",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลตะวันออก วิทยาเขตบางพระ จังหวัดชลบุรี",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลตะวันออก คณะเกษตรศาสตร์บางพระ จังหวัดชลบุรี",
    "วิทยาลัยพยาบาลบรมราชชนนี ชลบุรี",
    "วิทยาลัยการสาธารณสุขสิรินธร ชลบุรี",
    "มหาวิทยาลัยการกีฬาแห่งชาติ",
    "มหาวิทยาลัยการกีฬาแห่งชาติ วิทยาเขตชลบุรี",
    "สถาบันการจัดการปัญญาภิวัฒน์ วิทยาเขตอีอีซี",
  ],
  ชัยนาท: ["วิทยาลัยพยาบาลบรมราชชนนี ชัยนาท"],
  ชัยภูมิ: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดชัยภูมิ",
    "มหาวิทยาลัยราชภัฏชัยภูมิ",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์ชัยภูมิ",
    "มหาวิทยาลัยการกีฬาแห่งชาติ วิทยาเขตชัยภูมิ",
  ],
  ชุมพร: [
    "มหาวิทยาลัยแม่โจ้ - ชุมพร",
    "สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง วิทยาเขตชุมพรเขตอุดมศักดิ์",
    "มหาวิทยาลัยการกีฬาแห่งชาติ วิทยาเขตชุมพร",
  ],
  ตรัง: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดตรัง",
    "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตตรัง",
    "มหาวิทยาลัยสวนดุสิต ศูนย์การศึกษา ตรัง",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย วิทยาเขตตรัง",
    "วิทยาลัยพยาบาลบรมราชชนนี ตรัง",
    "วิทยาลัยการสาธารณสุขสิรินธร ตรัง",
    "มหาวิทยาลัยการกีฬาแห่งชาติ วิทยาเขตตรัง",
  ],
  ตราด: ["วิทยาลัยชุมชนตราด"],
  ตาก: [
    "วิทยาลัยนอร์ทเทิร์น",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์ตาก",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา วิทยาเขตตาก",
    "วิทยาลัยชุมชนตาก",
  ],
  นครนายก: [
    "มหาวิทยาลัยศรีนครินทรวิโรฒ องครักษ์",
    "มหาวิทยาลัยสุโขทัยธรรมาธิราช (ศูนย์วิทยบริการและชุมชนสัมพันธ์ มสธ. นครนายก)",
    "มหาวิทยาลัยนานาชาติเซนต์เทเรซา",
    "มหาวิทยาลัยสวนดุสิต ศูนย์การศึกษา นครนายก",
    "โรงเรียนนายร้อยพระจุลจอมเกล้า",
  ],
  นครปฐม: [
    "มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตกำแพงแสน",
    "มหาวิทยาลัยศิลปากร วิทยาเขตพระราชวังสนามจันทร์",
    "มหาวิทยาลัยคริสเตียน",
    "วิทยาลัยแสงธรรม",
    "มหาวิทยาลัยราชภัฏนครปฐม",
    "มหาวิทยาลัยราชภัฏสวนสุนันทา วิทยาเขตนครปฐม",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาเขตบาฬีศึกษาพุทธโฆส",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์พุทธปัญญาศรีทวารวดี นครปฐม",
    "มหาวิทยาลัยมหามกุฏราชวิทยาลัย วิทยาเขตสิรินธรราชวิทยาลัย",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลรัตนโกสินทร์ วิทยาเขตศาลายา",
    "โรงเรียนนายร้อยตำรวจ",
    "สถาบันกันตนา",
  ],
  นครพนม: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดนครพนม",
    "มหาวิทยาลัยนครพนม",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์นครพนม",
  ],
  นครราชสีมา: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดนครราชสีมา",
    "สถาบันบัณฑิตพัฒนบริหารศาสตร์ วิทยาเขตนครราชสีมา",
    "มหาวิทยาลัยเทคโนโลยีสุรนารี",
    "มหาวิทยาลัยวงษ์ชวลิตกุล",
    "มหาวิทยาลัยราชภัฏนครราชสีมา",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาเขตนครราชสีมา",
    "มหาวิทยาลัยมหามกุฏราชวิทยาลัย มหาปชาบดีเถรีวิทยาลัย ในพระสังฆราชูปถัมภ์",
    "มหาวิทยาลัยมหามกุฏราชวิทยาลัย วิทยาลัยศาสนศาสตร์นครราชสีมา",
    "วิทยาลัยนครราชสีมา",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน นครราชสีมา",
    "วิทยาลัยพยาบาลบรมราชชนนี นครราชสีมา",
    "วิทยาลัยเทคโนโลยีพนมวันท์",
  ],
  นครศรีธรรมราช: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดนครศรีธรรมราช",
    "มหาวิทยาลัยสุโขทัยธรรมาธิราช (ศูนย์วิทยบริการและชุมชนสัมพันธ์ มสธ. นครศรีธรรมราช)",
    "มหาวิทยาลัยวลัยลักษณ์",
    "วิทยาลัยเทคโนโลยีภาคใต้",
    "มหาวิทยาลัยราชภัฏนครศรีธรรมราช",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาเขตนครศรีธรรมราช",
    "มหาวิทยาลัยมหามกุฏราชวิทยาลัย วิทยาเขตศรีธรรมาโศกราช",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย วิทยาเขตนครศรีธรรมราช (พื้นที่ไสใหญ่)",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย วิทยาเขตนครศรีธรรมราช (พื้นที่ทุ่งใหญ่)",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย วิทยาเขตนครศรีธรรมราช (พื้นที่ขนอม)",
    "มหาวิทยาลัยเฉลิมกาญจนา นครศรีธรรมราช",
    "วิทยาลัยพยาบาลบรมราชชนนี นครศรีธรรมราช",
  ],
  นครสวรรค์: [
    "มหาวิทยาลัยมหิดล วิทยาเขตนครสวรรค์ (โครงการจัดตั้งวิทยาเขต)",
    "มหาวิทยาลัยสุโขทัยธรรมาธิราช (ศูนย์วิทยบริการและชุมชนสัมพันธ์ มสธ. นครสวรรค์)",
    "มหาวิทยาลัยเจ้าพระยา",
    "มหาวิทยาลัยภาคกลาง",
    "มหาวิทยาลัยราชภัฏนครสวรรค์",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาเขตนครสวรรค์",
    "วิทยาลัยพยาบาลบรมราชชนนี สวรรค์ประชารักษ์",
  ],
  นนทบุรี: [
    "มหาวิทยาลัยศิลปากร วิทยาเขตเมืองทองธานี",
    "มหาวิทยาลัยสุโขทัยธรรมาธิราช",
    "มหาวิทยาลัยสุโขทัยธรรมาธิราช (ศูนย์วิทยบริการและชุมชนสัมพันธ์ มสธ. นนทบุรี)",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลสุวรรณภูมิ",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลสุวรรณภูมิ วิทยาเขตนนทบุรี",
    "วิทยาลัยพยาบาลบรมราชชนนี นนทบุรี",
    "วิทยาลัยเทคโนโลยีทางการแพทย์และสาธารณสุข กาญจนาภิเษก",
    "วิทยาลัยการชลประทาน",
    "มหาวิทยาลัยราชพฤกษ์",
  ],
  นราธิวาส: [
    "มหาวิทยาลัยนราธิวาสราชนครินทร์",
    "วิทยาลัยชุมชนนราธิวาส",
    "วิทยาลัยพยาบาลบรมราชชนนี นราธิวาส",
  ],
  น่าน: [
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์นครน่านเฉลิมพระเกียรติฯ",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา วิทยาเขตน่าน",
    "วิทยาลัยชุมชนน่าน",
  ],
  บึงกาฬ: ["มหาวิทยาลัยราชภัฏอุดรธานี ศูนย์การศึกษาบึงกาฬ"],
  บุรีรัมย์: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดบุรีรัมย์",
    "มหาวิทยาลัยเวสเทิร์น บุรีรัมย์",
    "มหาวิทยาลัยราชภัฏบุรีรัมย์",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์บุรีรัมย์",
    "มหาวิทยาลัยเฉลิมกาญจนา บุรีรัมย์",
    "วิทยาลัยชุมชนบุรีรัมย์",
  ],
  ปทุมธานี: [
    "มหาวิทยาลัยธรรมศาสตร์ ศูนยรังสิต",
    "มหาวิทยาลัยกรุงเทพ",
    "มหาวิทยาลัยกรุงเทพ วิทยาเขตรังสิต",
    "มหาวิทยาลัยรังสิต",
    "มหาวิทยาลัยชินวัตร",
    "มหาวิทยาลัยเวสเทิร์น วัชรพล",
    "มหาวิทยาลัยอีสเทิร์นเอเชีย",
    "มหาวิทยาลัยปทุมธานี",
    "มหาวิทยาลัยรัตนบัณฑิต วิทยาเขตปทุมธานี",
    "มหาวิทยาลัยราชภัฏวไลยอลงกรณ์ ในพระบรมราชูปถัมภ์",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลธัญบุรี วิทยาเขตปทุมธานี",
    "สถาบันวิทยาการจัดการแห่งแปซิฟิค วิทยาเขตนิมิตใหม่",
  ],
  ประจวบคีรีขันธ์: [
    "มหาวิทยาลัยสวนดุสิต ศูนย์การศึกษา หัวหิน",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลรัตนโกสินทร์ วิทยาเขตวังไกลกังวล",
  ],
  ปราจีนบุรี: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดปราจีนบุรี",
    "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ วิทยาเขตปราจีนบุรี",
    "วิทยาลัยการแพทย์แผนไทยอภัยภูเบศร",
    "สถาบันเทคโนโลยีแห่งสุวรรณภูมิ",
  ],
  ปัตตานี: [
    "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตปัตตานี",
    "มหาวิทยาลัยฟาฏอนี",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์ปัตตานี",
    "วิทยาลัยชุมชนปัตตานี",
  ],
  พระนครศรีอยุธยา: [
    "มหาวิทยาลัยราชภัฏพระนครศรีอยุธยา",
    "มหาวิทยาลัยมหามกุฏราชวิทยาลัย วิทยาเขตมหาวชิราลงกรณราชวิทยาลัย",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลสุวรรณภูมิ วิทยาเขตพระนครศรีอยุธยา วาสุกรี",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลสุวรรณภูมิ วิทยาเขตพระนครศรีอยุธยา หันตรา",
    "สถาบันวิทยาการประกอบการแห่งอโยธยา",
  ],
  พะเยา: [
    "มหาวิทยาลัยพะเยา",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาเขตพะเยา",
    "วิทยาลัยพยาบาลบรมราชชนนี พะเยา",
    "สถาบันวิทยาการจัดการแห่งแปซิฟิค",
  ],
  พังงา: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดพังงา",
    "วิทยาลัยชุมชนพังงา",
  ],
  พัทลุง: ["มหาวิทยาลัยทักษิณ วิทยาเขตพัทลุง"],
  พิจิตร: [
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์พิจิตร",
    "วิทยาลัยชุมชนพิจิตร",
  ],
  พิษณุโลก: [
    "สถาบันบัณฑิตพัฒนบริหารศาสตร์ วิทยาเขตพิษณุโลก",
    "มหาวิทยาลัยนเรศวร",
    "มหาวิทยาลัยราชภัฏพิบูลสงคราม",
    "มหาวิทยาลัยพิษณุโลก",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์พุทธชินราช",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา วิทยาเขตพิษณุโลก",
    "วิทยาลัยพยาบาลบรมราชชนนี พุทธชินราช",
    "วิทยาลัยการสาธารณสุขสิรินธร พิษณุโลก",
  ],
  ภูเก็ต: [
    "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตภูเก็ต",
    "สถาบันบัณฑิตพัฒนบริหารศาสตร์ วิทยาเขตภูเก็ต",
    "มหาวิทยาลัยราชภัฏภูเก็ต",
  ],
  มหาสารคาม: [
    "มหาวิทยาลัยมหาสารคาม",
    "มหาวิทยาลัยราชภัฏมหาสารคาม",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์มหาสารคาม",
    "วิทยาลัยพยาบาลศรีมหาสารคาม",
    "มหาวิทยาลัยการกีฬาแห่งชาติ วิทยาเขตมหาสารคาม",
  ],
  มุกดาหาร: [
    "มหาวิทยาลัยอุบลราชธานี วิทยาเขตมุกดาหาร",
    "วิทยาลัยชุมชนมุกดาหาร",
  ],
  ยะลา: [
    "มหาวิทยาลัยสุโขทัยธรรมาธิราช (ศูนย์วิทยบริการและชุมชนสัมพันธ์ มสธ. ยะลา)",
    "สถาบันบัณฑิตพัฒนบริหารศาสตร์ วิทยาเขตยะลา",
    "สถาบันรัชต์ภาคย์ วิทยาเขตยะลา",
    "มหาวิทยาลัยราชภัฏยะลา",
    "วิทยาลัยชุมชนยะลา",
    "วิทยาลัยพยาบาลบรมราชชนนี ยะลา",
    "วิทยาลัยการสาธารณสุขสิรินธร ยะลา",
    "มหาวิทยาลัยการกีฬาแห่งชาติ วิทยาเขตยะลา",
  ],
  ยโสธร: [
    "มหาวิทยาลัยมหามกุฏราชวิทยาลัย วิทยาลัยศาสนศาสตร์ยโสธร",
    "วิทยาลัยชุมชนยโสธร",
  ],
  ระนอง: [
    "มหาวิทยาลัยราชภัฏสวนสุนันทา ศูนย์การศึกษาจังหวัดระนอง",
    "วิทยาลัยชุมชนระนอง",
  ],
  ระยอง: [
    "สถาบันบัณฑิตพัฒนบริหารศาสตร์ จังหวัดระยอง ",
    "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ วิทยาเขตระยอง",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์ระยอง",
    "มหาวิทยาลัยเฉลิมกาญจนา วิทยาเขตระยอง",
    "สถาบันวิทยสิริเมธี",
  ],
  ราชบุรี: [
    "มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี วิทยาเขตราชบุรี",
    "มหาวิทยาลัยราชภัฏหมู่บ้านจอมบึง",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์ราชบุรี",
    "วิทยาลัยพยาบาลบรมราชชนนี จักรีรัช",
    "วิทยาลัยพยาบาลบรมราชชนนี ราชบุรี",
    "วิทยาลัยเทคโนโลยีสยาม วิทยาเขตราชบุรี",
  ],
  ร้อยเอ็ด: [
    "มหาวิทยาลัยราชภัฏร้อยเอ็ด",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์ร้อยเอ็ด",
    "มหาวิทยาลัยมหามกุฏราชวิทยาลัย วิทยาเขตร้อยเอ็ด",
  ],
  ลพบุรี: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดลพบุรี",
    "มหาวิทยาลัยราชภัฏเทพสตรี",
  ],
  ลำปาง: [
    "มหาวิทยาลัยธรรมศาสตร์ ศูนย์ลำปาง",
    "มหาวิทยาลัยสุโขทัยธรรมาธิราช (ศูนย์วิทยบริการและชุมชนสัมพันธ์ มสธ. ลำปาง)",
    "มหาวิทยาลัยเนชั่น",
    "มหาวิทยาลัยราชภัฏลำปาง",
    "มหาวิทยาลัยสวนดุสิต ศูนย์การศึกษา ลำปาง",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์นครลำปาง",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา วิทยาเขตลำปาง",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา สถาบันวิจัยและฝึกอบรมการเกษตรลำปาง",
    "วิทยาลัยอินเตอร์เทคลำปาง",
    "วิทยาลัยพยาบาลบรมราชชนนี นครลำปาง",
    "มหาวิทยาลัยการกีฬาแห่งชาติ วิทยาเขตลำปาง",
  ],
  ลำพูน: [
    "สถาบันบัณฑิตพัฒนบริหารศาสตร์ วิทยาเขตลำพูน",
    "มหาวิทยาลัยธนบุรี วิทยาเขตภาคเหนือ จังหวัดลำพูน",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์ลำพูน",
  ],
  ศรีสะเกษ: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดศรีสะเกษ",
    "มหาวิทยาลัยราชภัฏศรีสะเกษ",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์ศรีสะเกษ",
    "มหาวิทยาลัยเฉลิมกาญจนา ศรีสะเกษ",
    "มหาวิทยาลัยการกีฬาแห่งชาติ วิทยาเขตศรีสะเกษ",
  ],
  สกลนคร: [
    "มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตเฉลิมพระเกียรติ จังหวัดสกลนคร",
    "มหาวิทยาลัยราชภัฏสกลนคร",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตสกลนคร",
  ],
  สงขลา: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดสงขลา",
    "มหาวิทยาลัยสงขลานครินทร์",
    "สถาบันบัณฑิตพัฒนบริหารศาสตร์ วิทยาเขตหาดใหญ่",
    "มหาวิทยาลัยทักษิณ",
    "มหาวิทยาลัยทักษิณ วิทยาเขตสงขลา",
    "มหาวิทยาลัยหาดใหญ่",
    "มหาวิทยาลัยราชภัฏสงขลา",
    "วิทยาลัยพุทธศาสนานานาชาติ",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลศรีวิชัย วิทยาเขตสงขลา",
    "วิทยาลัยชุมชนสงขลา",
    "วิทยาลัยพยาบาลบรมราชชนนี สงขลา",
  ],
  สตูล: ["มหาวิทยาลัยราชภัฏสงขลา วิทยาเขตสตูล", "วิทยาลัยชุมชนสตูล"],
  สมุทรปราการ: [
    "มหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ",
    "มหาวิทยาลัยอัสสัมชัญ วิทยาเขตสุวรรณภูมิ",
    "โรงเรียนนายเรือ",
    "ศูนย์ฝึกพาณิชย์นาวี",
  ],
  สมุทรสงคราม: [
    "มหาวิทยาลัยราชภัฏสวนสุนันทา วิทยาเขตสมุทรสงคราม",
    "สถาบันการเรียนรู้เพื่อปวงชน",
  ],
  สมุทรสาคร: [
    "วิทยาลัยชุมชนสมุทรสาคร",
    "มหาวิทยาลัยการกีฬาแห่งชาติ วิทยาเขตสมุทรสาคร",
    "สถาบันเทคโนโลยียานยนต์มหาชัย",
  ],
  สระบุรี: [
    "มหาวิทยาลัยนานาชาติเอเชีย-แปซิฟิก",
    "วิทยาลัยพยาบาลบรมราชชนนี พระพุทธบาท",
    "วิทยาลัยพยาบาลบรมราชชนนี สระบุรี",
  ],
  สระแก้ว: ["มหาวิทยาลัยบูรพา วิทยาเขตสารสนเทศสระแก้ว", "วิทยาลัยชุมชนสระแก้ว"],
  สุพรรณบุรี: [
    "มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตสุพรรณบุรี",
    "มหาวิทยาลัยสวนดุสิต วิทยาเขตสุพรรณบุรี",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์สุพรรณบุรีศรีสุวรรณภูมิ",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลสุวรรณภูมิ วิทยาเขตสุพรรณบุรี",
    "วิทยาลัยพยาบาลบรมราชชนนี สุพรรณบุรี",
    "วิทยาลัยการสาธารณสุขสิรินธร สุพรรณบุรี",
    "มหาวิทยาลัยการกีฬาแห่งชาติ วิทยาเขตสุพรรณบุรี",
  ],
  สุราษฎร์ธานี: [
    "มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตสุราษฎร์ธานี",
    "สถาบันบัณฑิตพัฒนบริหารศาสตร์ วิทยาเขตสุราษฎร์ธานี",
    "มหาวิทยาลัยตาปี",
    "มหาวิทยาลัยราชภัฏสุราษฏร์ธานี",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์สุราษฎร์ธานี",
    "วิทยาลัยพยาบาลบรมราชชนนี สุราษฎร์ธานี",
  ],
  สุรินทร์: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดสุรินทร์",
    "มหาวิทยาลัยราชภัฏสุรินทร์",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาเขตสุรินทร์",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลอีสาน วิทยาเขตสุรินทร์",
    "มหาวิทยาลัยเฉลิมกาญจนา สุรินทร์",
    "วิทยาลัยพยาบาลบรมราชชนนี สุรินทร์",
  ],
  สุโขทัย: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดสุโขทัย",
    "มหาวิทยาลัยสุโขทัยธรรมาธิราช (ศูนย์วิทยบริการและชุมชนสัมพันธ์ มสธ. สุโขทัย)",
    "วิทยาลัยชุมชนสุโขทัย",
    "มหาวิทยาลัยการกีฬาแห่งชาติ วิทยาเขตสุโขทัย",
  ],
  หนองคาย: [
    "มหาวิทยาลัยขอนแก่น วิทยาเขตหนองคาย",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาเขตหนองคาย",
  ],
  หนองบัวลำภู: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดหนองบัวลำภู",
    "วิทยาลัยชุมชนหนองบัวลำภู",
    "วิทยาลัยพิชญบัณฑิต",
  ],
  อำนาจเจริญ: [
    "มหาวิทยาลัยมหิดล วิทยาเขตอำนาจเจริญ",
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดอำนาจเจริญ",
  ],
  อุดรธานี: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดอุดรธานี",
    "มหาวิทยาลัยสุโขทัยธรรมาธิราช (ศูนย์วิทยบริการและชุมชนสัมพันธ์ มสธ. อุดรธานี)",
    "สถาบันบัณฑิตพัฒนบริหารศาสตร์ วิทยาเขตอุดรธานี",
    "มหาวิทยาลัยราชธานี วิทยาเขตอุดรธานี",
    "วิทยาลัยสันตพล",
    "มหาวิทยาลัยราชภัฏสวนสุนันทา ศูนย์การศึกษาจังหวัดอุดรธานี",
    "มหาวิทยาลัยราชภัฏอุดรธานี",
    "วิทยาลัยพยาบาลบรมราชชนนี อุดรธานี",
    "มหาวิทยาลัยการกีฬาแห่งชาติ วิทยาเขตอุดรธานี",
  ],
  อุตรดิตถ์: [
    "มหาวิทยาลัยราชภัฏอุตรดิตถ์",
    "วิทยาลัยพยาบาลบรมราชชนนี อุตรดิตถ์",
  ],
  อุทัยธานี: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดอุทัยธานี",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์อุทัยธานี",
    "วิทยาลัยชุมชนอุทัยธานี",
  ],
  อุบลราชธานี: [
    "มหาวิทยาลัยสุโขทัยธรรมาธิราช (ศูนย์วิทยบริการและชุมชนสัมพันธ์ มสธ. อุบลราชธานี)",
    "สถาบันบัณฑิตพัฒนบริหารศาสตร์ วิทยาเขตอุบลราชธานี",
    "มหาวิทยาลัยอุบลราชธานี",
    "มหาวิทยาลัยราชธานี",
    "มหาวิทยาลัยการจัดการและเทคโนโลยีอีสเทิร์น",
    "มหาวิทยาลัยราชภัฏอุบลราชธานี",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาเขตอุบลราชธานี",
    "วิทยาลัยพยาบาลบรมราชชนนี สรรพสิทธิประสงค์ อุบลราชธานี",
    "วิทยาลัยพยาบาลสรรพสิทธิประสงค์ อุบลราชธานี",
    "วิทยาลัยการสาธารณสุขสิรินธร อุบลราชธานี",
  ],
  อ่างทอง: ["มหาวิทยาลัยการกีฬาแห่งชาติ วิทยาเขตอ่างทอง"],
  เชียงราย: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดเชียงราย",
    "สถาบันบัณฑิตพัฒนบริหารศาสตร์ วิทยาเขตเชียงราย",
    "มหาวิทยาลัยแม่ฟ้าหลวง",
    "วิทยาลัยแสงธรรม วิทยาเขตเซเวียร์",
    "มหาวิทยาลัยราชภัฏเชียงราย",
    "วิทยาลัยเชียงราย",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์เชียงราย",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา วิทยาเขตเชียงราย",
  ],
  เชียงใหม่: [
    "มหาวิทยาลัยเชียงใหม่",
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดเชียงใหม่",
    "มหาวิทยาลัยแม่โจ้",
    "มหาวิทยาลัยพายัพ",
    "มหาวิทยาลัยฟาร์อีสเทอร์น",
    "มหาวิทยาลัยนอร์ท-เชียงใหม่",
    "มหาวิทยาลัยราชภัฏเชียงใหม่",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาเขตเชียงใหม่",
    "มหาวิทยาลัยมหามกุฏราชวิทยาลัย วิทยาเขตล้านนา",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา วิทยาเขตดอยสะเก็ด",
    "มหาวิทยาลัยเทคโนโลยีราชมงคลล้านนา วิทยาเขตภาคพายัพจังหวัดเชียงใหม่",
    "วิทยาลัยพยาบาลบรมราชชนนี เชียงใหม่",
    "มหาวิทยาลัยการกีฬาแห่งชาติ วิทยาเขตเชียงใหม่",
  ],
  เพชรบุรี: [
    "มหาวิทยาลัยศิลปากร วิทยาเขตสารสนเทศเพชรบุรี",
    "มหาวิทยาลัยสุโขทัยธรรมาธิราช (ศูนย์วิทยบริการและชุมชนสัมพันธ์ มสธ. เพชรบุรี)",
    "มหาวิทยาลัยนานาชาติแสตมฟอร์ด",
    "มหาวิทยาลัยราชภัฏเพชรบุรี",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์เพชรบุรี",
    "วิทยาลัยพยาบาลพระจอมเกล้า เพชรบุรี",
  ],
  เพชรบูรณ์: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดเพชรบูรณ์",
    "มหาวิทยาลัยราชภัฏเพชรบูรณ์",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์พ่อขุนผาเมือง เพชรบูรณ์",
    "มหาวิทยาลัยเฉลิมกาญจนา เพชรบูรณ์",
    "มหาวิทยาลัยการกีฬาแห่งชาติ วิทยาเขตเพชรบูรณ์",
  ],
  เลย: [
    "มหาวิทยาลัยราชภัฏเลย",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาลัยสงฆ์เลย",
  ],
  แพร่: [
    "มหาวิทยาลัยรามคำแหง สาขาวิทยบริการเฉลิมพระเกียรติจังหวัดแพร่",
    "มหาวิทยาลัยแม่โจ้ - แพร่ ฉลิมพระเกียรติ",
    "มหาวิทยาลัยมหาจุฬาลงกรณราชวิทยาลัย วิทยาเขตแพร่",
    "วิทยาลัยชุมชนแพร่",
    "วิทยาลัยพยาบาลบรมราชชนนี แพร่",
  ],
  แม่ฮ่องสอน: [
    "มหาวิทยาลัยราชภัฏเชียงใหม่ วิทยาเขตแม่ฮ่องสอน",
    "วิทยาลัยชุมชนแม่ฮ่องสอน",
  ],
};

const PersonalInfo = () => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [maritalstatus, setMaritalstatus] = useState("");
  const [gender, setGender] = useState("");
  const [lgbt, setLGBT] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [province, setProvince] = useState("");
  const [university, setUniversity] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [lineId, setLineId] = useState("");
  const [phone, setPhone] = useState("");
  const [dormName, setDormName] = useState("");
  const [vehicle, setVehicle] = useState("");
  const [selfIntroduction, setSelfIntroduction] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { user_id, email } = location.state || {};

  // Handle province change
  const handleProvinceChange = (event) => {
    const selectedProvince = event.target.value;
    setProvince(selectedProvince);
    setUniversity(""); // Reset university when province changes
  };

  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    // จำลองการคลิกที่ input file
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload profile picture if selected
      if (profilePicture) {
        const formData = new FormData();
        formData.append("profile_picture", profilePicture);
        formData.append("user_id", user_id);

        const { data } = await axios.post("/upload-profile-picture", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log("Profile picture uploaded:", data.profilePictureUrl);
      }

      await axios.post("/personalinfo", {
        user_id,
        email,
        firstname,
        lastname,
        nickname,
        age,
        maritalstatus,
        gender,
        lgbt: lgbt ? 1 : 0,
        province,
        university,
        facebook,
        instagram,
        line_id: lineId,
        phone,
        dorm_name: dormName,
        vehicle,
        self_introduction: selfIntroduction,
      });
      alert("Personal information saved successfully!");
      navigate("/personalityprofile", { state: { user_id } });
    } catch (err) {
      alert("Error updating personal info.");
    }
  };

  return (
    <AppTheme>
      <CssBaseline />
      <Box
        sx={{
          padding: "2rem",
          maxWidth: "600px",
          minWidth: "400px",
          margin: "auto",
          marginTop: "10vh",
          border: "1px solid #eee",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.08)",
          borderRadius: "20px",
        }}
      >
        <Stack spacing={1} useFlexGap>
          <Typography variant="h4">ประวัติส่วนตัว</Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} useFlexGap>
              <TextField
                required
                type="text"
                label="ชื่อจริง"
                placeholder="กรอกชื่อจริง"
                variant="outlined"
                fullWidth
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
              />
              <TextField
                required
                type="text"
                label="นามสกุล"
                placeholder="กรอกนามสกุล"
                variant="outlined"
                fullWidth
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
              <TextField
                required
                type="text"
                label="ชื่อเล่น"
                placeholder="กรอกชื่อเล่น"
                variant="outlined"
                fullWidth
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
              <TextField
                required
                type="number"
                label="อายุ"
                placeholder="กรอกอายุ"
                variant="outlined"
                fullWidth
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
              <FormControl fullWidth required>
                <InputLabel>สถานะ</InputLabel>
                <Select
                  value={maritalstatus}
                  onChange={(e) => setMaritalstatus(e.target.value)}
                >
                  <MenuItem value="single">โสด</MenuItem>
                  <MenuItem value="inrelationship">มีแฟน</MenuItem>
                  <MenuItem value="married">แต่งงานแล้ว</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth required>
                <InputLabel>เพศ</InputLabel>
                <Select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <MenuItem value="male">ชาย</MenuItem>
                  <MenuItem value="female">หญิง</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Checkbox
                  checked={lgbt}
                  onChange={(e) => setLGBT(e.target.checked)}
                />
                <Typography variant="body2">มีความหลากหลายทางเพศ</Typography>
              </Box>
              <FormControl fullWidth required>
                <InputLabel>จังหวัด</InputLabel>
                <Select value={province} onChange={handleProvinceChange}>
                  {provinces.map((prov) => (
                    <MenuItem key={prov} value={prov}>
                      {prov}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required disabled={!province}>
                <InputLabel>มหาวิทยาลัย</InputLabel>
                <Select
                  value={university}
                  onChange={(e) => setUniversity(e.target.value)}
                >
                  {province &&
                    (universitiesByProvince[province] || []).map((uni) => (
                      <MenuItem key={uni} value={uni}>
                        {uni}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <TextField
                type="text"
                label="ชื่อหอพัก"
                placeholder="ชื่อหอพักของคุณ"
                variant="outlined"
                fullWidth
                value={dormName}
                onChange={(e) => setDormName(e.target.value)}
              />

              <FormControl fullWidth>
                <InputLabel>ยานพาหนะ</InputLabel>
                <Select
                  value={vehicle}
                  onChange={(e) => setVehicle(e.target.value)}
                  label="ยานพาหนะ"
                >
                  <MenuItem value="none">ไม่มี</MenuItem>
                  <MenuItem value="motorbike">มอเตอร์ไซค์</MenuItem>
                  <MenuItem value="car">รถยนต์</MenuItem>
                  <MenuItem value="other">อื่นๆ</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="แนะนำตัว"
                placeholder="แนะนำตัวคุณสั้นๆ"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                value={selfIntroduction}
                onChange={(e) => setSelfIntroduction(e.target.value)}
              />

              <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                โซเชียลมีเดียและข้อมูลติดต่อ
              </Typography>

              <TextField
                type="text"
                label="Facebook"
                placeholder="ชื่อ Facebook ของคุณ"
                variant="outlined"
                fullWidth
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
              />

              <TextField
                type="text"
                label="Instagram"
                placeholder="ชื่อ Instagram ของคุณ"
                variant="outlined"
                fullWidth
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
              />

              <TextField
                type="text"
                label="Line ID"
                placeholder="Line ID"
                variant="outlined"
                fullWidth
                value={lineId}
                onChange={(e) => setLineId(e.target.value)}
              />

              <TextField
                type="tel"
                label="หมายเลขโทรศัพท์"
                placeholder="หมายเลขโทรศัพท์ของคุณ"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <Button
                type="button"
                onClick={handleButtonClick}
                variant="outlined"
              >
                เลือกรูปภาพโปรไฟล์
              </Button>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                style={{ display: "none" }} // ซ่อน input file
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ textTransform: "none" }}
              >
                บันทึก
              </Button>
            </Stack>
          </form>
        </Stack>
      </Box>
    </AppTheme>
  );
};

export default PersonalInfo;
