import { Box } from '@mui/system';
import { DataGrid } from 'devextreme-react';
import { Column, FilterRow, Lookup, Export, Selection, Editing, Scrolling } from 'devextreme-react/data-grid';
import React, { useState } from 'react'
import { useEffect } from 'react'
import { getPayments, getPaymentTypes, getUsers } from '../backend/services'

export default function Payments() {
    const [users, setUsers] = useState([]);
    const [paymentTypes, setPaymentTypes] = useState([]);
    const [payments, setPayments] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const dataUsers = await getUsers();
            const dataPaymentsTypes = await getPaymentTypes();
            const dataPayments = await getPayments();

            setUsers(dataUsers);
            setPaymentTypes(dataPaymentsTypes);
            setPayments(dataPayments);
        }

        fetchData();
    }, []);

  return (
    <>
        <Box className="mt-9">
            <DataGrid
                dataSource={payments}
                allowColumnReordering={true}
                allowColumnResizing={true}
                rowAlternationEnabled={true}
                showBorders={true}
                width="100%"
                columnAutoWidth={true}
                className="grid-payments"
                remoteOperations={false}
                height={600}
            >

            <Scrolling mode="infinite" />

            <Editing
                allowUpdating={true}
                allowAdding={false}
                allowDeleting={true}
                mode="popup" 
                useIcons={true}
            />

            <Export
              enabled={true}
              fileName="GridPagamentos"
              allowExportSelectedData={true}
            />

            <Selection
              mode="multiple"
              selectAllMode="page"
              showCheckBoxesMode="always"
              allowSelectAll={false}
            />

            <FilterRow visible={true} />

            <Column
                dataField="id"
                caption={"Id"}
                allowEditing={false}
            />
            <Column
                dataField="paymentId"
                caption={"Payment Type"}
                allowEditing={false}
            >
                <Lookup 
                    dataSource={paymentTypes}
                    valueExpr="id"
                    displayExpr="name"
                />
            </Column>
            <Column
                dataField="userId"
                caption={"User"}
                allowEditing={false}
            >
                <Lookup 
                    dataSource={users}
                    valueExpr="id"
                    displayExpr="name"
                />
            </Column>
            <Column
                dataField="value"
                caption={"Value"}
                allowEditing={false}
                dataType="number"
                format="#,##0.00"
            />
            </DataGrid>
        </Box>
    </>
  )
}
