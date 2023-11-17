import { Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { AdminUrl } from '../../../constants/constants';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function RevenueList() {
    const TABLE_HEAD = ["Date", "BookingId", "Customer", "Product", "Service", "Amount"];

    const [revenue, setRevenue] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');

    const fetchRevenue = async (month = null) => {
        const url = month != null ? `${AdminUrl}/revenue-list/?month=${month}` : `${AdminUrl}/revenue-list/`
        try {
            const response = await axios.get(url);
            setRevenue(response.data);
            console.log(response.data)
        } catch (error) {
            console.error('Error fetching revenue:', error);
        }
    };

    useEffect(() => {
        fetchRevenue();
    }, []);

    const handleMonthChange = (event) => {
        const month = event.target.value;
        setSelectedMonth(month);
        console.log('Mnonnn ', month);
        fetchRevenue(month);
    };


    const exportPDF = () => {
        const unit = "pt";
        const size = "A4";
        const orientation = "portrait";

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(10);

        const title = "Revenue Report";
        const headers = TABLE_HEAD;

        const data = revenue.map(entry => [
            entry.date_of_booking,
            entry.booking_id,
            entry.user.email,
            entry.booked_service.service_product.product_name,
            entry.booked_service.service_name,
            entry.booking_amount
        ]);

        let content = {
            startY: 50,
            head: [headers],
            body: data
        };

        doc.text(title, marginLeft, 40);
        doc.autoTable(content);
        doc.save("revenue-report.pdf");
    };

    return (
        <Card className="h-full w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            Revenue list
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all revenue
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                  
                        <div className="flex flex-row gap-2">
                            <label htmlFor="month" className="mr-2">
                                Select Month:
                            </label>
                            <select
                                id="month"
                                name="month"
                                onChange={handleMonthChange}
                                value={selectedMonth || ''}
                                className="border border-blue-gray-300 p-1 rounded"
                            >
                                <option value="">All</option>
                                <option value="1">January</option>
                                <option value="2">February</option>
                                <option value="3">March</option>
                                <option value="4">April</option>
                                <option value="5">May</option>
                                <option value="6">June</option>
                                <option value="7">July</option>
                                <option value="8">August</option>
                                <option value="9">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>
                        <Button color="gray" size='sm' onClick={exportPDF}>
                            Generate Report
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardBody className=" px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head) => (
                                <th
                                    key={head}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {revenue.map((revenue) => (
                            <tr key={revenue.id}>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray">
                                        {revenue.date_of_booking}

                                    </Typography>
                                </td>
                                <td className="p-4">
                                    <Typography variant="small" color="blue-gray">
                                        {revenue.booking_id}

                                    </Typography>
                                </td>

                                <td className="p-4 ">
                                    <div className="flex flex-col">
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {revenue.user.first_name}
                                        </Typography>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal opacity-70"
                                        >
                                            {revenue.user.email}
                                        </Typography>
                                    </div>
                                </td>
                                <td className="p-4 ">
                                    <Typography variant="small" color="blue-gray">
                                        {revenue.booked_service.service_product.product_name}
                                    </Typography>
                                </td>
                                <td className="p-4 ">
                                    <Typography variant="small" color="blue-gray">
                                        {revenue.booked_service.service_name}
                                    </Typography>
                                </td>
                                <td className="p-4 ">
                                    <Typography variant="small" color="blue-gray">
                                        {revenue.booking_amount}
                                    </Typography>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardBody>

            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm">
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    )
}

export default RevenueList