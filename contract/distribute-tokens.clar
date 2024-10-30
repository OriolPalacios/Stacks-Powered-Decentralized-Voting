(define-constant contract-owner 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM)
(define-constant err-owner-only (err u102))
;; (define-constant contract-owner 'ST1VSYCCDQ5K5G8TBMPZM3QV2YDGBWWMTWMXJ8XHP)
(define-fungible-token unsaac-coin u1000000)

;; define a list that will hold the voters that are in the main contract
(define-data-var voters (list 100 principal) (list))

;; retri

(define-private (single-transfer (address principal)) 
    (ft-transfer? unsaac-coin u10 tx-sender address)
)


;; map over a list like iterating it, to later like to transfer to them a certain amount of tokens that are in my wallet
(define-public (distribute-tokens (voters-list (list 100 principal)) (amount uint))
    (begin  
        (asserts! (is-eq tx-sender contract-owner) err-owner-only)
        (var-set voters voters-list)
        ;; (try! (ft-transfer? unsaac-coin amount tx-sender (var-get voters)))
        (map single-transfer voters-list)
        (ok true)
    )
)