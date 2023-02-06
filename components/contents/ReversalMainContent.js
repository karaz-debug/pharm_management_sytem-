import React from 'react'
import ReversalData from '../ReversalData'
import TableContent from '../TableContent'
import WelcomeBanner from '../WelcomeBanner'

function ReversalMainContent() {
    // Logic to implement
    // 1.List down in a table all the Reversal that took place from the sales person
    // 2.Approve them if valid reason found
    // 3.Show a graph showing the number of reversals and and most of the reason that happened

    // Need to pass differents props to the Table content on basis of what we need there to show up
    return (
        <div>
            <WelcomeBanner />
            {/* Table */}
            <TableContent />
            {/* Reversal */}
            <ReversalData />
        </div>
    )
}

export default ReversalMainContent
