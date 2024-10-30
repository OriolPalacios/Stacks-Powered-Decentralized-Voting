(define-constant contract-owner 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)
(define-constant err-owner-only (err u101))

;; Define the fungible token
(define-fungible-token unsaac-coin u1000000)

;; Define data variables
(define-data-var total-voters uint u0)
(define-data-var total-candidates uint u0)

;; Private function to update totals
(define-private (update-totals)
    (begin 
        (var-set total-voters (len (unwrap-panic (contract-call? 'ST1VSYCCDQ5K5G8TBMPZM3QV2YDGBWWMTWMXJ8XHP.test_vote_2 get-candidates))))
        (var-set total-candidates (len (unwrap-panic (contract-call? 'ST1VSYCCDQ5K5G8TBMPZM3QV2YDGBWWMTWMXJ8XHP.test_vote_2 get-candidates))))
    )
)

;; Public function to initialize or reset totals
(define-public (initialize-totals)
    (begin
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (update-totals)
        (ok true)
    )
)

;; Function to get the total number of voters
(define-read-only (get-total-voters)
    (ok (var-get total-voters))
)

;; Function to get the total number of candidates
(define-read-only (get-total-candidates)
    (ok (var-get total-candidates))
)
