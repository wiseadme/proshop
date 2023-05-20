class ListNode {
    constructor(value, next) {
        this.value = value
        this.next = next
    }
}

//new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, null)))))
const removeNthFromEnd = (head, n) => {
    head = new ListNode(null, head)

    let start = head
    let end = head

    while (n--) {
        end = end.next
    }

    while (end && end.next) {
        [start, end] = [start.next, end.next]
    }

    start.next = start.next.next
    console.log(end)

    return head.next
}

removeNthFromEnd([1, 2, 3, 4, 5], 2)
