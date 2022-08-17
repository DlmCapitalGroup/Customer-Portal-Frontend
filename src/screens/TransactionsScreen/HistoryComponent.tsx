import React from 'react'
import Table from '../../components/TableComponent';
import Modal from '../../components/ModalComponent';

const History = () => {
  return (
    <>
      <h3 className="text-xl font-semibold mb-8">Transaction History</h3>
      <Table />
      <Modal />
    </>
  )
}

export default History;